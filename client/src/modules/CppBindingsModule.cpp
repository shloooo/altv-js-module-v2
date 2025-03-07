#include "Module.h"
#include "interfaces/IResource.h"

static void AnswerRPC(js::FunctionContext& ctx)
{
    if(!ctx.CheckArgCount(3, 4)) return;

    uint16_t answerID;
    if(!ctx.GetArg(0, answerID)) return;

    alt::MValue answer;
    if(!ctx.GetArg(1, answer)) return;

    std::string error;
    if(!ctx.GetArg(2, error)) return;

    alt::ICore::Instance().TriggerServerRPCAnswer(answerID, answer, error);
}

static void SendRPC(js::FunctionContext& ctx)
{
    if(!ctx.CheckArgCount(1, 32)) return;

    std::string rpcName;
    if(!ctx.GetArg(0, rpcName)) return;

    js::IResource* resource = ctx.GetResource();

    alt::MValueArgs args;
    args.reserve(ctx.GetArgCount() - 1);
    alt::MValue val;
    for(int i = 1; i < ctx.GetArgCount(); i++)
    {
        if(resource->IsRawEmitEnabled())
        {
            v8::Local<v8::Value> arg;
            if(!ctx.GetArg(i, arg)) continue;
            alt::MValueByteArray result = js::JSToRawBytes(arg, resource);
            if(!ctx.Check(result.get() != nullptr, "Failed to serialize argument at index " + std::to_string(i))) return;
            val = result;
        }
        else if(!ctx.GetArg(i, val))
            continue;

        args.push_back(val);
    }

    ctx.Return(alt::ICore::Instance().TriggerServerRPCEvent(rpcName, args));
}

static void GetStreamedInVirtualEntities(js::FunctionContext& ctx)
{
    std::vector<alt::IVirtualEntity*> streamedInVirtualEntities = alt::ICore::Instance().GetVirtualEntitiesStreamedIn();
    ctx.Return(streamedInVirtualEntities);
}

// clang-format off
extern js::Module sharedCppBindingsModule;

// !!! Make sure to keep the name as cppBindings
static js::Module cppBindingsModule("cppBindings", "sharedCppBindings", [](js::ModuleTemplate& module)
{
    module.StaticFunction("answerRPC", AnswerRPC);
    module.StaticFunction("sendRPC", SendRPC);
    module.StaticFunction("getStreamedInVirtualEntities", GetStreamedInVirtualEntities);
});
