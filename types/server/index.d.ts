/// <reference types="../shared/index.d.ts" />

/**
 * @module @altv/server
 */

declare module "@altv/server" {
    import * as altShared from "@altv/shared";

    export const rootDir: string;
    export const syncedMeta: altShared.GlobalSyncedMeta & Record<string, unknown>;
    export const serverConfig: Readonly<Record<string, unknown>>;

    export function setServerPassword(password: string): void;
    export function hashServerPassword(password: string): number;
    export function stopServer(): void;
    export function toggleWorldProfiler(state: boolean): void;
    export function getEntitiesInDimension(dimension: number, entityTypes: altShared.Enums.BaseObjectFilterType): ReadonlyArray<altShared.BaseObject>;
    export function getEntitiesInRange(pos: altShared.IVector3, range: number, dimension: number, entityTypes: altShared.Enums.BaseObjectFilterType): ReadonlyArray<altShared.BaseObject>;
    export function getClosestEntities(pos: altShared.IVector3, range: number, dimension: number, maxCount: number, entityTypes: altShared.Enums.BaseObjectFilterType): ReadonlyArray<altShared.BaseObject>;

    export function setVoiceExternalPublic(host: string, port: number): void;
    export function setVoiceExternal(host: string, port: number): void;

    export function hasBenefit(benefit: altShared.Enums.Benefit): boolean;

    export class BaseObject extends altShared.BaseObject {
        meta: BaseObjectMeta & Record<string, unknown>;
        syncedMeta: altShared.BaseObjectSyncedMeta & Record<string, unknown>;

        static getByID(type: altShared.Enums.BaseObjectType, id: number): BaseObject | null;
    }

    export interface SharedBlipCreateOptions {
        global: boolean;
        targets?: Array<Entity>;

        blipType: altShared.Enums.BlipType;

        initialMeta?: Partial<{
            meta: BlipMeta & Record<string, unknown>;
            syncedMeta: altShared.BlipSyncedMeta & Record<string, unknown>;
        }>;
    }

    export type PointBlipCreateOptions = { pos: altShared.IVector3; entity?: never } | { entity: Entity; pos?: never };

    type BlipCreateOptions = SharedBlipCreateOptions &
        (({ blipType: altShared.Enums.BlipType.AREA } & altShared.AreaBlipCreateOptions) | ({ blipType: altShared.Enums.BlipType.RADIUS } & altShared.RadiusBlipCreateOptions) | ({ blipType: altShared.Enums.BlipType.DESTINATION } & PointBlipCreateOptions));

    export abstract class Blip extends WorldObject {
        readonly targets: ReadonlyArray<Player>;

        readonly scriptID: number;
        readonly isStreamedIn: boolean;
        readonly isAttached: boolean;
        attachedTo?: Entity;

        global: boolean;

        blipType: altShared.Enums.BlipType;
        scaleXY: altShared.Vector2;
        display: number;
        sprite: number;
        color: number;
        secondaryColor: number;
        alpha: number;
        flashTimer: number;
        flashInterval: number;
        friendly: boolean;
        route: boolean;
        bright: boolean;
        number: number;
        showCone: boolean;
        flashes: boolean;
        flashesAlternate: boolean;
        shortRange: boolean;
        priority: number;
        rotation: number;
        gxtName: string;
        name: string;
        routeColor: altShared.RGBA;
        pulse: boolean;
        missionCreator: boolean;
        tickVisible: boolean;
        headingIndicatorVisible: boolean;
        outlineIndicatorVisible: boolean;
        friendIndicatorVisible: boolean;
        crewIndicatorVisible: boolean;
        category: number;
        highDetail: boolean;
        shrinked: boolean;
        visible: boolean;
        hiddenOnLegend: boolean;
        minimalOnEdge: boolean;
        useHeightIndicatorOnEdge: boolean;
        shortHeightThreshold: boolean;

        attachTo(entity: Entity): boolean;
        fade(opacity: number, duration: number): void;
        addTarget(target: Player): void;
        removeTarget(target: Player): void;

        meta: BlipMeta & Record<string, unknown>;
        syncedMeta: altShared.BlipSyncedMeta & Record<string, unknown>;

        public onCreate?(opts: BlipCreateOptions): void;
        public onDestroy?(): void;

        static getByID(id: number): Blip | null;
        static create(opts: BlipCreateOptions): Blip;

        static setFactory(factory: typeof Blip): void;
        static getFactory<T extends Blip>(): T;
    }

    export namespace PointBlip {
        export function create(opts: PointBlipCreateOptions & SharedBlipCreateOptions): Blip;
    }

    export namespace AreaBlip {
        export function create(opts: altShared.AreaBlipCreateOptions & SharedBlipCreateOptions): Blip;
    }

    export namespace RadiusBlip {
        export function create(opts: altShared.RadiusBlipCreateOptions & SharedBlipCreateOptions): Blip;
    }

    export abstract class Marker extends WorldObject {
        readonly isGlobal: boolean;
        readonly target?: Player;
        readonly streamingDistance: number;

        meta: MarkerMeta & Record<string, unknown>;
        syncedMeta: altShared.MarkerSyncedMeta & Record<string, unknown>;

        color: altShared.RGBA;
        visible: boolean;
        markerType: altShared.Enums.MarkerType;
        scale: altShared.IVector3;
        rot: altShared.IVector3;
        direction: altShared.IVector3;
        faceCamera: boolean;
        rotating: boolean;
        bobUpDown: boolean;

        static readonly all: ReadonlyArray<Marker>;

        public onCreate?(opts: MarkerCreateOptions): void;
        public onDestroy?(): void;

        static getByID(id: number): Marker | null;
        static create(opts: MarkerCreateOptions): Marker;

        static setFactory(factory: typeof Marker): void;
        static getFactory<T extends Marker>(): T;
    }

    export abstract class ColShapeSphere extends ColShape {
        readonly radius: number;

        public onCreate?(opts: altShared.ColShapeSphereCreateOptions<ColShapeMeta>): void;
        public onDestroy?(): void;

        static create(opts: altShared.ColShapeSphereCreateOptions<ColShapeMeta>): ColShapeSphere;
    }

    export abstract class ColShapeCylinder extends ColShape {
        readonly radius: number;
        readonly height: number;

        public onCreate?(opts: altShared.ColShapeCylinderCreateOptions<ColShapeMeta>): void;
        public onDestroy?(): void;

        static create(opts: altShared.ColShapeCylinderCreateOptions<ColShapeMeta>): ColShapeCylinder;
    }

    export abstract class ColShapeCircle extends ColShape {
        readonly radius: number;

        public onCreate?(opts: altShared.ColShapeCircleCreateOptions<ColShapeMeta>): void;
        public onDestroy?(): void;

        static create(opts: altShared.ColShapeCircleCreateOptions<ColShapeMeta>): ColShapeCircle;
    }

    export abstract class ColShapeCuboid extends ColShape {
        readonly min: altShared.Vector3;
        readonly max: altShared.Vector3;

        public onCreate?(opts: altShared.ColShapeCuboidCreateOptions<ColShapeMeta>): void;
        public onDestroy?(): void;

        static create(opts: altShared.ColShapeCuboidCreateOptions<ColShapeMeta>): ColShapeCuboid;
    }

    export abstract class ColShapeRectangle extends ColShape {
        readonly min: altShared.Vector2;
        readonly max: altShared.Vector2;

        public onCreate?(opts: altShared.ColShapeRectangleCreateOptions<ColShapeMeta>): void;
        public onDestroy?(): void;

        static create(opts: altShared.ColShapeRectangleCreateOptions<ColShapeMeta>): ColShapeRectangle;
    }

    export abstract class ColShapePolygon extends ColShape {
        readonly minZ: number;
        readonly maxZ: number;

        readonly points: ReadonlyArray<altShared.Vector2>;

        public onCreate?(opts: altShared.ColShapePolygonCreateOptions<ColShapeMeta>): void;
        public onDestroy?(): void;

        static create(opts: altShared.ColShapePolygonCreateOptions<ColShapeMeta>): ColShapePolygon;
    }

    export abstract class ColShape extends WorldObject {
        readonly colShapeType: altShared.Enums.ColShapeType;
        playersOnly: boolean;

        isEntityIn(entity: Entity): boolean;
        isEntityIdIn(id: number): boolean;
        isPointIn(point: altShared.Vector3): boolean;

        meta: ColShapeMeta & Record<string, unknown>;
        syncedMeta: altShared.ColShapeSyncedMeta & Record<string, unknown>;

        static readonly all: ReadonlyArray<ColShape>;

        static setFactory(factory: typeof ColShape): void;
        static getFactory<T extends ColShape>(): T;
    }

    export interface MarkerCreateOptions {
        target?: Player;
        pos?: altShared.IVector3;

        type: altShared.Enums.MarkerType;
        color?: altShared.IRGBA; // default: { r: 255, g: 255, b: 255, a: 255 }

        initialMeta?: Partial<{
            meta: MarkerMeta & Record<string, unknown>;
            syncedMeta: altShared.MarkerSyncedMeta & Record<string, unknown>;
        }>;
    }

    export interface CheckpointCreateOptions {
        type: altShared.Enums.CheckpointType;
        pos: altShared.IVector3;
        radius: number;
        height: number;
        color: altShared.RGBA;
        streamingDistance: number;

        initialMeta?: Partial<{
            meta: CheckpointMeta & Record<string, unknown>;
            syncedMeta: altShared.CheckpointSyncedMeta & Record<string, unknown>;
            streamSyncedMeta: altShared.CheckpointStreamSyncedMeta & Record<string, unknown>;
        }>;
    }

    // @ts-expect-error - Suppresses "Class static side 'typeof Checkpoint' incorrectly extends base class static side 'typeof ColShape'.""
    export abstract class Checkpoint extends ColShape {
        readonly isStreamedIn: boolean;

        checkpointType: number;
        radius: number;
        height: number;
        color: altShared.RGBA;
        iconColor: altShared.RGBA;
        nextPos: altShared.IVector3;
        readonly streamingDistance: number;
        visible: boolean;

        isEntityIn(entity: Entity): boolean;
        isEntityIdIn(id: number): boolean;
        isPointIn(point: altShared.Vector3): boolean;

        meta: CheckpointMeta & Record<string, unknown>;
        syncedMeta: altShared.CheckpointSyncedMeta & Record<string, unknown>;
        streamSyncedMeta: altShared.CheckpointStreamSyncedMeta & Record<string, unknown>;

        public onCreate?(opts: CheckpointCreateOptions): void;
        public onDestroy?(): void;

        static readonly all: ReadonlyArray<Checkpoint>;

        static create(opts: CheckpointCreateOptions): Checkpoint;
        static getByID(id: number): Checkpoint | null;

        static setFactory(factory: typeof Checkpoint): void;
        static getFactory<T extends Checkpoint>(): T;
    }

    export abstract class Entity extends WorldObject {
        get model(): number;
        netOwner?: Player;

        rot: altShared.Vector3;

        visible: boolean;
        streamed: boolean;
        frozen: boolean;
        collision: boolean;
        streamingDistance: number;
        readonly timestamp: number;

        meta: EntityMeta & Record<string, unknown>;
        syncedMeta: altShared.EntitySyncedMeta & Record<string, unknown>;
        streamSyncedMeta: altShared.EntityStreamSyncedMeta & Record<string, unknown>;

        setNetOwner(player: Player, disableMigration: boolean): void;
        resetNetOwner(disableMigration: boolean): void;

        attachTo(target: Entity, otherBoneId: number | string, boneId: number | string, pos: altShared.IVector3, rot: altShared.IVector3, collision: boolean, noFixedRot: boolean): void;
        detach(): void;

        static readonly all: ReadonlyArray<Entity>;
    }

    export class Metric {
        readonly name: string;
        value: bigint;
        readonly valid: boolean;

        constructor(name: string, type?: altShared.Enums.MetricType);

        add(value: bigint | number): void;
        inc(): void;

        begin(): void;
        end(): void;
        destroy(): void;
    }

    export interface ObjectCreateOptions {
        model: number | string;
        pos: altShared.IVector3;
        rot?: altShared.IVector3; // default: { x: 0, y: 0, z: 0 }
        alpha?: number; // default: 255
        textureVariation?: number; // default: 0
        lodDistance?: number; // default: 100
        streamingDistance?: number; // default: 0

        initialMeta?: Partial<{
            meta: ObjectMeta & Record<string, unknown>;
            syncedMeta: altShared.ObjectSyncedMeta & Record<string, unknown>;
            streamSyncedMeta: altShared.ObjectStreamSyncedMeta & Record<string, unknown>;
        }>;
    }

    export abstract class Object extends Entity {
        alpha: number;
        textureVariation: number;
        lodDistance: number;

        activatePhysics(): void;
        placeOnGroundProperly(): void;

        meta: ObjectMeta & Record<string, unknown>;
        syncedMeta: altShared.ObjectSyncedMeta & Record<string, unknown>;
        streamSyncedMeta: altShared.ObjectStreamSyncedMeta & Record<string, unknown>;

        public onCreate?(opts: ObjectCreateOptions): void;
        public onDestroy?(): void;

        static readonly all: ReadonlyArray<Object>;

        static getByID(id: number): Object | null;
        static create(opts: ObjectCreateOptions): Object;

        static setFactory(factory: typeof Object): void;
        static getFactory<T extends Object>(): T;
    }

    export interface PedCreateOptions {
        model: number | string;
        pos: altShared.IVector3;
        heading?: number; // default: 0
        streamingDistance?: number; // default: 0

        initialMeta?: Partial<{
            meta: PedMeta & Record<string, unknown>;
            syncedMeta: altShared.PedSyncedMeta & Record<string, unknown>;
            streamSyncedMeta: altShared.PedStreamSyncedMeta & Record<string, unknown>;
        }>;
    }

    export abstract class Ped extends Entity {
        health: number;
        maxHealth: number;
        armour: number;
        currentWeapon: number;

        meta: PedMeta & Record<string, unknown>;
        syncedMeta: altShared.PedSyncedMeta & Record<string, unknown>;
        streamSyncedMeta: altShared.PedStreamSyncedMeta & Record<string, unknown>;

        public onCreate?(opts: PedCreateOptions): void;
        public onDestroy?(): void;

        static getByID(id: number): Ped | null;
        static create(opts: PedCreateOptions): Ped;

        static readonly all: ReadonlyArray<Ped>;

        static setFactory(factory: typeof Ped): void;
        static getFactory<T extends Ped>(): T;
    }

    export class Player extends Entity {
        readonly name: string;

        readonly ip: string;
        readonly socialID: bigint;
        readonly socialClubName: string;
        readonly hwidHash: bigint;
        readonly hwidExHash: bigint;
        readonly cloudID: string;
        readonly cloudAuthResult: altShared.Enums.CloudAuthResult;

        readonly isConnected: boolean;
        readonly ping: number;
        readonly authToken: string;
        readonly discordID: number;

        get model(): number;
        set model(value: number | string);

        armour: number;
        maxArmour: number;

        health: number;
        maxHealth: number;
        invincible: boolean;

        readonly currentWeaponComponents: ReadonlyArray<number>;
        readonly currentWeaponTintIndex: number;
        get currentWeapon(): number;
        set currentWeapon(value: number | string);
        readonly isDead: boolean;
        readonly isJumping: boolean;
        readonly isInRagdoll: boolean;
        readonly isAiming: boolean;
        readonly isShooting: boolean;
        readonly isReloading: boolean;
        readonly isEnteringVehicle: boolean;
        readonly isLeavingVehicle: boolean;
        readonly isOnLadder: boolean;
        readonly isInMelee: boolean;
        readonly isInCover: boolean;
        readonly isParachuting: boolean;
        readonly moveSpeed: number;
        readonly aimPos: altShared.Vector3;
        readonly headRotation: altShared.Vector3;
        readonly isInVehicle: boolean;
        readonly vehicle?: Vehicle;
        readonly seat: number;
        readonly entityAimingAt: Entity;
        readonly entityAimOffset: altShared.Vector3;
        readonly isFlashlightActive: boolean;
        readonly isSuperJumpEnabled: boolean;
        readonly isCrouching: boolean;
        readonly isStealthy: boolean;
        readonly currentAnimationDict: number;
        readonly currentAnimationName: number;
        readonly isSpawned: boolean;
        readonly forwardSpeed: number;
        readonly strafeSpeed: number;

        headBlendData: altShared.Appearance.HeadBlendData;
        eyeColor: number;
        hairColor: number;
        hairHighlightColor: number;

        readonly weapons: ReadonlyArray<altShared.WeaponInfo>;

        readonly interiorLocation: number;
        readonly lastDamagedBodyPart: number;
        sendNames: boolean;
        readonly streamedEntities: ReadonlyArray<StreamedInPlayerEntities>;

        readonly cloudAuthHash: string;
        netOwnershipDisabled: boolean;
        bloodDamageBase64: string;

        emit<E extends keyof altShared.Events.CustomServerToPlayerEvent>(event: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        emit<E extends string>(event: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        emitRaw<E extends keyof altShared.Events.CustomServerToPlayerEvent>(event: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        emitRaw<E extends string>(event: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        emitUnreliable<E extends keyof altShared.Events.CustomServerToPlayerEvent>(event: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        emitUnreliable<E extends string>(event: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        emitUnreliableRaw<E extends keyof altShared.Events.CustomServerToPlayerEvent>(event: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        emitUnreliableRaw<E extends string>(event: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        spawn(pos: altShared.IVector3, delay?: number): void;
        despawn(): void;
        setWeaponTintIndex(weaponHash: number | string, tintIndex: number): void;
        addWeaponComponent(weaponHash: number | string, componentHash: number | string): void;
        getWeaponTintIndex(weaponHash: number | string): number | undefined;
        hasWeaponComponent(weaponHash: number | string, componentHash: number | string): boolean;
        removeWeaponComponent(weaponHash: number | string, componentHash: number | string): void;
        clearBloodDamage(): void;
        giveWeapon(weaponHash: number | string, ammo: number, selectWeapon?: boolean): void;
        removeWeapon(weaponHash: number | string): void;
        removeAllWeapons(): void;
        setDateTime(day: number, month: number, year: number, hour: number, minute: number, second: number): void;
        setWeather(weather: number): void;

        kick(reason?: string): void;

        getClothes(componentId: number): altShared.Appearance.Clothing;
        setClothes(componentId: number, drawable: number, texture: number, palette?: number): boolean;
        getDlcClothes(componentId: number): altShared.Appearance.DlcClothing;
        setDlcClothes(componentId: number, drawable: number, texture: number, palette: number, dlc: number): boolean;
        clearClothes(componentId: number): boolean;
        getProp(componentId: number): altShared.Appearance.Prop;
        setProp(componentId: number, drawable: number, texture: number): boolean;
        getDlcProp(componentId: number): altShared.Appearance.DlcProp;
        setDlcProp(componentId: number, drawable: number, texture: number, dlc: number): boolean;
        clearProp(componentId: number): void;

        isEntityInStreamingRange(entity: Entity | number): boolean;
        setIntoVehicle(vehicle: Vehicle, seat: number): void;
        playAmbientSpeech(speechName: string, speechParam: string, speechDictHash: number): void;

        setHeadOverlay(overlayId: number, index: number, opacity: number): boolean;
        removeHeadOverlay(overlayId: number): boolean;
        setHeadOverlayColor(overlayId: number, colorType: number, colorIndex: number, secondColorIndex: number): boolean;

        getHeadOverlay(overlayId: number): altShared.Appearance.HeadOverlay | undefined;

        setFaceFeature(index: number, scale: number): boolean;
        getFaceFeature(index: number): number;
        removeFaceFeature(index: number): boolean;

        setHeadBlendPaletteColor(id: number, colorOrRed: altShared.RGBA | number, green?: number, blue?: number): boolean;
        getHeadBlendPaletteColor(id: number): altShared.RGBA;
        removeHeadBlendPaletteColor(): void;

        playAnimation(animDict: string, animName: string, blendInSpeed?: number, blendOutSpeed?: number, duration?: number, flag?: number, playbackRate?: number, lockX?: boolean, lockY?: boolean, lockZ?: boolean): void;
        clearTasks(): void;

        hasWeapon(weaponHash: number | string): boolean;
        getAmmo(ammoHash: number | string): number | undefined;
        setAmmo(ammoHash: number | string, ammo: number): void;
        getWeaponAmmo(weaponHash: number | string): number | undefined;
        setWeaponAmmo(weaponHash: number | string, ammo: number): void;

        getAmmoSpecialType(ammoHash: number | string): number;
        setAmmoSpecialType(ammoHash: number | string, specialType: altShared.Enums.AmmoSpecialType): void;

        getAmmoFlags(ammoHash: number | string): altShared.AmmoData;
        setAmmoFlags(flags: altShared.AmmoData & { ammoHash: string }): void;
        getAmmoMax(ammoHash: number | string): number | undefined;
        setAmmoMax(ammoHash: number | string, ammo: number): void;
        getAmmoMax50(ammoHash: number | string): number | undefined;
        setAmmoMax50(ammoHash: number | string, ammo: number): void;
        getAmmoMax100(ammoHash: number | string): number | undefined;
        setAmmoMax100(ammoHash: number | string, ammo: number): void;
        addDecoration(collection: number | string, overlay: number | string, count?: number): void;
        removeDecoration(collection: number | string, overlay: number | string): void;
        clearDecorations(): void;
        getDecorations(): ReadonlyArray<{ collection: number; overlay: number; count: number }>;
        playScenario(name: string): void;

        sendRPC<E extends keyof altShared.RPC.CustomServerToPlayerRpcEvent>(rpcName: E, ...args: Parameters<altShared.RPC.CustomServerToPlayerRpcEvent[E]>): Promise<ReturnType<altShared.RPC.CustomServerToPlayerRpcEvent[E]>>;
        sendRPC<E extends string>(rpcName: Exclude<E, keyof altShared.RPC.CustomServerToPlayerRpcEvent>, ...args: unknown[]): Promise<any>;

        meta: PlayerMeta & Record<string, unknown>;
        localMeta: PlayerLocalMeta & Record<string, unknown>;
        syncedMeta: altShared.PlayerSyncedMeta & Record<string, unknown>;
        streamSyncedMeta: altShared.PlayerStreamSyncedMeta & Record<string, unknown>;

        static readonly all: ReadonlyArray<Player>;
        static getByID(id: number): Player | null;

        static setFactory(factory: typeof Player): void;
        static getFactory<T extends Player>(): T;
    }

    export abstract class Resource extends altShared.Resource {
        readonly clientType: string;
        readonly clientMain: string;
        readonly clientFiles: ReadonlyArray<string>;

        readonly requiredPermissions: ReadonlyArray<altShared.Enums.Permission>;
        readonly optionalPermissions: ReadonlyArray<altShared.Enums.Permission>;

        getMatchedFiles(pattern: string): ReadonlyArray<string>;

        static start(resourceName: string): void;
        static stop(resourceName: string): void;
        static restart(resourceName: string): void;
    }

    export interface VehicleCreateOptions {
        model: number | string;
        pos: altShared.IVector3;
        rot?: altShared.IVector3; // default: { x: 0, y: 0, z: 0 }
        streamingDistance?: number; // default: 0

        initialMeta?: Partial<{
            meta: VehicleMeta & Record<string, unknown>;
            syncedMeta: altShared.VehicleSyncedMeta & Record<string, unknown>;
            streamSyncedMeta: altShared.VehicleStreamSyncedMeta & Record<string, unknown>;
        }>;
    }

    export abstract class Vehicle extends Entity {
        readonly neon: altShared.VehicleNeonState;
        readonly driver?: Player;
        readonly isDestroyed: boolean;
        readonly modKitsCount: number;
        readonly IsPrimaryColorRGB: boolean;
        readonly primaryColorRGB: altShared.RGBA;
        readonly isSecondaryColorRGB: boolean;
        readonly secondaryColorRGB: altShared.RGBA;
        readonly isTireSmokeColorCustom: boolean;
        readonly wheelType: number;
        readonly wheelVariation: number;
        readonly isNeonActive: boolean;
        readonly isHandbrakeActive: boolean;
        readonly isSirenActive: boolean;
        readonly isDaylightOn: boolean;
        readonly isNightlightOn: boolean;
        readonly isFlamethrowerActive: boolean;
        readonly wheelsCount: number;
        readonly repairsCount: number;
        readonly hasArmoredWindows: boolean;
        readonly isManualEngineControl: boolean;
        readonly velocity: altShared.Vector3;
        readonly steeringAngle: number;
        readonly passengers: Readonly<{ [seat: string]: Player }>;

        rearWheelVariation: number;

        modKit: number;
        primaryColor: number;
        customPrimaryColor: altShared.RGBA;
        secondaryColor: number;
        customSecondaryColor: altShared.RGBA;
        pearlColor: number;
        wheelColor: number;
        interiorColor: number;
        dashboardColor: number;
        tireSmokeColor: altShared.RGBA;
        customTires: boolean;
        specialDarkness: number;
        numberplateIndex: number;
        numberplateText: string;
        windowTint: number;
        dirtLevel: number;
        neonColor: altShared.RGBA;
        livery: number;
        roofLivery: number;
        appearanceDataBase64: string;
        engineOn: boolean;
        headlightColor: number;
        radioStationIndex: number;
        sirenActive: boolean;
        lockState: altShared.Enums.VehicleLockState;
        roofState: number;
        lightsMultiplier: number;
        engineHealth: number;
        petrolTankHealth: number;
        bodyHealth: number;
        bodyAdditionalHealth: number;
        manualEngineControl: boolean;
        damageDataBase64: string;
        scriptDataBase64: string;
        gameStateBase64: string;
        healthDataBase64: string;
        attached?: Vehicle;
        attachedTo?: Vehicle;
        driftMode: boolean;

        isMissionTrain: boolean;
        trainTrackId: number;
        trainEngine?: Vehicle;
        trainConfigIndex: number;
        hasTrainEngine: boolean;
        isTrainCaboose: boolean;
        trainDirection: boolean;
        hasTrainPassengerCarriages: boolean;
        trainRenderDerailed: boolean;
        trainForceDoorsOpen: boolean;
        trainCruiseSpeed: number;
        trainCarriageConfigIndex: number;
        trainLinkedToBackward?: Vehicle;
        trainLinkedToForward?: Vehicle;
        trainUnk1: boolean;
        trainUnk2: boolean;
        trainUnk3: boolean;

        boatAnchorActive: boolean;
        lightState: number;

        readonly hasTimedExplosion: boolean;
        readonly timedExplosionCulprit?: Player;
        readonly timedExplosionTime: number;

        towingDisabled: boolean;
        rocketRefuelSpeed: number;
        counterMeasureCount: number;
        scriptMaxSpeed: number;
        hybridExtraActive: boolean;
        hybridExtraState: number;

        quaternion: altShared.Quaternion;
        readonly isHornActive: boolean;
        readonly accelerationLevel: number;
        readonly brakeLevel: number;

        setNeonActive(neons: Partial<altShared.VehicleNeonState>): void;
        getNeonActive(): altShared.VehicleNeonState;

        getMod(category: number): number;
        getModsCount(category: number): number;
        isExtraOn(extraId: number): boolean;
        getDoorState(doorId: number): number;
        isWindowOpened(windowId: number): boolean;
        isWheelBurst(wheelId: number): boolean;
        getWheelHasTire(wheelId: number): boolean;
        isWheelDetached(wheelId: number): boolean;
        isWheelOnFire(wheelId: number): boolean;
        getWheelHealth(wheelId: number): number;

        getPartDamageLevel(partId: altShared.Enums.VehiclePart): altShared.Enums.VehiclePartDamage;
        getPartBulletHoles(partId: number): number;

        isLightDamaged(lightId: number): boolean;
        isWindowDamaged(windowId: number): boolean;

        isSpecialLightDamaged(specialLightId: number): boolean;
        getArmoredWindowHealth(windowId: number): number;
        getArmoredWindowShootCount(windowId: number): number;
        getBumperDamageLevel(bumperId: number): number;
        toggleExtra(extraId: number, state: boolean): void;

        repair(): void;
        setMod(category: number, id: number): boolean;
        setWheels(type: number, variation: number): void;
        setDoorState(doorId: number, state: number): void;
        setWindowOpened(windowId: number, state: boolean): void;
        setWheelBurst(wheelId: number, state: boolean): void;
        setWheelDetached(wheelId: number, state: boolean): void;
        setWheelOnFire(wheelId: number, state: boolean): void;
        setWheelHealth(wheelId: number, health: number): void;
        setWheelFixed(wheelId: number): void;
        setWheelHasTire(wheelId: number, state: boolean): void;

        setPartDamageLevel(partId: altShared.Enums.VehiclePart, damage: altShared.Enums.VehiclePartDamage): void;
        setPartBulletHoles(partId: number, shootsCount: number): void;
        setLightDamaged(lightId: number, isDamaged: boolean): void;
        setWindowDamaged(windowId: number, isDamaged: boolean): void;
        setSpecialLightDamaged(specialLightId: number, isDamaged: boolean): void;
        setArmoredWindowHealth(windowId: number, health: number): void;
        setArmoredWindowShootCount(windowId: number, count: number): void;
        setBumperDamageLevel(bumperId: number, damageLevel: number): void;
        setSearchLight(state: number, spottedEntity: Entity): boolean;
        setTimedExplosion(state: boolean, culprit: Player, time: number): void;
        getWeaponCapacity(index: number): number;
        setWeaponCapacity(index: number, state: number): void;
        setBadge(textureDictionary: string | number, texture: string | number, pos: VehicleBadgePosition, pos2?: VehicleBadgePosition, pos3?: VehicleBadgePosition, pos4?: VehicleBadgePosition): void;

        meta: VehicleMeta & Record<string, unknown>;
        syncedMeta: altShared.VehicleSyncedMeta & Record<string, unknown>;
        streamSyncedMeta: altShared.VehicleStreamSyncedMeta & Record<string, unknown>;

        public onCreate?(opts: VehicleCreateOptions): void;
        public onDestroy?(): void;

        static getByID(id: number): Vehicle | null;
        static create(opts: VehicleCreateOptions): Vehicle;
        static all: ReadonlyArray<Vehicle>;

        static setFactory(factory: typeof Vehicle): void;
        static getFactory<T extends Vehicle>(): T;
    }

    export interface VehicleBadgePosition {
        active?: boolean; // default: false
        alpha?: number; // default: 255
        size?: number; // default: 1
        boneIndex?: number; // default: 0
        offset?: altShared.Vector3; // default: { x: 0, y: 0, z: 0 }
        direction?: altShared.Vector3; // default: { x: 0, y: 0, z: 0 }
        side?: altShared.Vector3; // default: { x: 0, y: 0, z: 0 }
    }

    export interface VirtualEntityCreateOptions {
        group: VirtualEntityGroup;
        pos: altShared.IVector3;
        streamingDistance: number;

        data?: altShared.VirtualEntityStreamSyncedMeta & Record<string, unknown>;

        initialMeta?: Partial<{
            meta: VirtualEntityMeta & Record<string, unknown>;
            // syncedMeta: altShared.VirtualEntitySyncedMeta & Record<string, unknown>;
            streamSyncedMeta: altShared.VirtualEntityStreamSyncedMeta & Record<string, unknown>;
        }>;
    }

    export abstract class VirtualEntityGroup extends BaseObject {
        readonly maxEntitiesInStream: number;

        static readonly all: ReadonlyArray<VirtualEntityGroup>;

        public onCreate?(opts: altShared.VirtualEntityGroupCreateOptions): void;
        public onDestroy?(): void;

        static create(opts: altShared.VirtualEntityGroupCreateOptions): VirtualEntityGroup;

        static setFactory(factory: typeof VirtualEntityGroup): void;
        static getFactory<T extends VirtualEntityGroup>(): T;

        static getByID(id: number): VirtualEntityGroup | null;
    }

    export abstract class VirtualEntity extends WorldObject {
        readonly isStreamedIn: boolean;

        readonly group: VirtualEntityGroup;
        readonly streamingDistance: number;

        visible: boolean;

        meta: VirtualEntityMeta & Record<string, unknown>;
        // syncedMeta: altShared.VirtualEntitySyncedMeta & Record<string, unknown>;
        streamSyncedMeta: altShared.VirtualEntityStreamSyncedMeta & Record<string, unknown>;

        public setMultipleSyncedMetaData(data: altShared.VirtualEntityStreamSyncedMeta & Record<string, unknown>): void;
        public setMultipleStreamSyncedMetaData(data: altShared.VirtualEntityStreamSyncedMeta & Record<string, unknown>): void;

        public onCreate?(opts: VirtualEntityCreateOptions): void;
        public onDestroy?(): void;

        static readonly all: ReadonlyArray<VirtualEntity>;

        static getByID(id: number): VirtualEntity | null;
        static create(opts: VirtualEntityCreateOptions): VirtualEntity;

        static setFactory(factory: typeof VirtualEntity): void;
        static getFactory<T extends VirtualEntity>(): T;
    }

    export interface VoiceChannelCreateOptions {
        spatial: boolean;
        maxDistance?: number;

        initialMeta?: Partial<{
            meta: VoiceChannelMeta & Record<string, unknown>;
        }>;
    }

    export abstract class VoiceChannel extends BaseObject {
        readonly isSpatial: boolean;
        readonly maxDistance: number;

        readonly players: ReadonlyArray<Player>;
        readonly playerCount: number;

        meta: VoiceChannelMeta & Record<string, unknown>;
        /**
            Priority of voice channel. If a player is in two channels and both can be heard by another player, only one should play the voice.
            Value is of type integer, can be negative.
         */
        priority: number;
        /**
         * Hash of the filter name (should also be created on clientside).
         * See docs: [Audio filters](https://docs.altv.mp/articles/audio_filters.html), [Voice](https://docs.altv.mp/articles/voice.html).
         */
        filter: number;

        hasPlayer(player: Player): boolean;
        addPlayer(player: Player): void;
        removePlayer(player: Player): void;

        isPlayerMuted(player: Player): boolean;
        mutePlayer(player: Player): void;
        unmutePlayer(player: Player): void;

        public onCreate?(opts: VoiceChannelCreateOptions): void;
        public onDestroy?(): void;

        static readonly all: ReadonlyArray<VoiceChannel>;

        static create(opts: VoiceChannelCreateOptions): VoiceChannel;

        static setFactory(factory: typeof VoiceChannel): void;
        static getFactory<T extends VoiceChannel>(): T;
    }

    export abstract class WorldObject extends BaseObject {
        dimension: number;
        pos: altShared.Vector3;
    }

    export interface BoneInfo {
        id: number;
        index: number;
        name: string;
    }

    export interface PedModelInfo {
        hash: number;
        name: string;
        type: string;
        dlcName: string;
        defaultUnarmedWeapon: string;
        movementClipSet: string;
        bones: BoneInfo[];
    }

    export interface VehicleModelInfo {
        model: number;
        modelHash: number;
        title: string;
        modelType: altShared.Enums.VehicleModelType;
        wheelsCount: number;
        hasArmoredWindows: boolean;
        primaryColor: number;
        secondaryColor: number;
        pearlColor: number;
        wheelsColor: number;
        interiorColor: number;
        dashboardColor: number;
        modkits: number[];
        extras: number;
        defaultExtras: number;
        hasAutoAttachTrailer: boolean;
        bones: BoneInfo[];
        canAttachCars: boolean;
        handlingNameHash: number;

        doesExtraExist(extraId: number): boolean | undefined;
        isExtraDefault(extraId: number): boolean | undefined;
    }

    export interface WeaponModelInfo {
        hash: number;
        name: string;
        model: string;
        modelHash: number;
        ammoTypeHash: number;
        ammoType: string;
        ammoModelHash: number;
        ammoModelName: string;
        defaultMaxAmmoMp: number;
        skillAbove50MaxAmmoMp: number;
        maxSkillMaxAmmoMp: number;
        bonusMaxAmmoMp: number;
    }

    export namespace Streaming {
        export let maxStreamingPeds: number;
        export let maxStreamingObjects: number;
        export let maxStreamingVehicles: number;

        export let streamerThreadCount: number;
        export let streamingTickRate: number;
        export let streamingDistance: number;

        export let migrationThreadCount: number;
        export let migrationTickRate: number;
        export let migrationDistance: number;
        export let colShapeTickRate: number;

        export let syncReceiveThreadCount: number;
        export let syncSendThreadCount: number;
    }

    export namespace PedModelInfo {
        export function get(modelHash: number | string): PedModelInfo | undefined;
    }

    export namespace VehicleModelInfo {
        export function get(modelHash: number | string): VehicleModelInfo | undefined;
        export const loadedVehicleModels: ReadonlyArray<number>;
    }

    export namespace WeaponModelInfo {
        export function get(weaponHash: number | string): WeaponModelInfo | undefined;
    }

    export abstract class RPCHandler {
        public readonly name: string;
        public readonly handler: (player: Player, ...args: unknown[]) => Promise<any> | any;
        public readonly valid: boolean;

        public destroy(): void;
    }

    export namespace RPC {
        export type CustomPlayerRpcEventHandler<T extends unknown[], U extends Player = Player, V = unknown> = (player: U, ...args: T) => Promise<V> | V;

        export function register<U extends Player, E extends keyof altShared.RPC.CustomPlayerToServerRpcEvent = keyof altShared.RPC.CustomPlayerToServerRpcEvent>(
            rpcName: E,
            handler: CustomPlayerRpcEventHandler<Parameters<altShared.RPC.CustomPlayerToServerRpcEvent[E]>, U, ReturnType<altShared.RPC.CustomPlayerToServerRpcEvent[E]>>
        ): RPCHandler;
        export function register<U extends Player, E extends string = string>(rpcName: Exclude<E, keyof altShared.RPC.CustomPlayerToServerRpcEvent>, handler: CustomPlayerRpcEventHandler<any[], U>): RPCHandler;
    }

    export abstract class ConnectionInfo {
        readonly name: string;
        readonly socialID: bigint;
        readonly cloudID: string;
        readonly cloudAuthResult: altShared.Enums.CloudAuthResult;
        readonly socialClubName: string;
        readonly hwidHash: bigint;
        readonly hwidExHash: bigint;
        readonly authToken: string;
        readonly versionMajor: number;
        readonly versionMinor: number;
        readonly branch: string;
        readonly build: number;
        readonly cdnUrl: string;
        readonly passwordHash: number;
        readonly ip: string;
        readonly discordUserID: number;

        readonly isAccepted: boolean;
        text: string;

        accept(sendNames?: boolean): void;
        decline(reason: string): void;

        // TODO (xLuxy): Missing
        // static readonly all: ReadonlyArray<ConnectionInfo>;

        static getByID(id: number): ConnectionInfo | undefined;
    }

    export namespace Events {
        export let rawEmitEnabled: boolean;
        export function emit<E extends keyof CustomServerEvent>(event: E, ...args: Parameters<CustomServerEvent[E]>): void;
        export function emit<E extends string>(event: Exclude<E, keyof CustomServerEvent>, ...args: unknown[]): void;

        export function emitRaw<E extends keyof CustomServerEvent>(event: E, ...args: Parameters<CustomServerEvent[E]>): void;
        export function emitRaw<E extends string>(event: Exclude<E, keyof CustomServerEvent>, ...args: unknown[]): void;

        export function emitPlayers<E extends keyof altShared.Events.CustomServerToPlayerEvent>(players: Player[], eventName: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        export function emitPlayers<E extends string>(players: Player[], eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        export function emitPlayersUnreliable<E extends keyof altShared.Events.CustomServerToPlayerEvent>(players: Player[], eventName: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        export function emitPlayersUnreliable<E extends string>(players: Player[], eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        export function emitAllPlayers<E extends keyof altShared.Events.CustomServerToPlayerEvent>(eventName: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        export function emitAllPlayers<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        export function emitAllPlayersRaw<E extends keyof altShared.Events.CustomServerToPlayerEvent>(eventName: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        export function emitAllPlayersRaw<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        export function emitAllPlayersUnreliable<E extends keyof altShared.Events.CustomServerToPlayerEvent>(eventName: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        export function emitAllPlayersUnreliable<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        export function emitAllPlayersUnreliableRaw<E extends keyof altShared.Events.CustomServerToPlayerEvent>(eventName: E, ...args: Parameters<altShared.Events.CustomServerToPlayerEvent[E]>): void;
        export function emitAllPlayersUnreliableRaw<E extends string>(eventName: Exclude<E, keyof altShared.Events.CustomServerToPlayerEvent>, ...args: unknown[]): void;

        // RPC related events
        export function onScriptRPC<T extends Player>(callback: GenericPlayerEventCallback<ScriptRPCEventParameters, T>): altShared.Events.EventHandler;
        export function onceScriptRPC<T extends Player>(callback: GenericPlayerEventCallback<ScriptRPCEventParameters, T>): altShared.Events.EventHandler;
        export function onScriptRPCAnswer<T extends Player>(callback: GenericPlayerEventCallback<ScriptRPCAnswerEventParameters, T>): altShared.Events.EventHandler;
        export function onceScriptRPCAnswer<T extends Player>(callback: GenericPlayerEventCallback<ScriptRPCAnswerEventParameters, T>): altShared.Events.EventHandler;

        // Server related events
        export function onServerStarted(callback: GenericEventCallback): altShared.Events.EventHandler;
        export function onceServerStarted(callback: GenericEventCallback): altShared.Events.EventHandler;

        // Connection queue related events
        export function onConnectionQueueAdd(callback: GenericEventCallback<ConnectionQueueEventParameters>): altShared.Events.EventHandler;
        export function onceConnectionQueueAdd(callback: GenericEventCallback<ConnectionQueueEventParameters>): altShared.Events.EventHandler;
        export function onConnectionQueueRemove(callback: GenericEventCallback<ConnectionQueueEventParameters>): altShared.Events.EventHandler;
        export function onceConnectionQueueRemove(callback: GenericEventCallback<ConnectionQueueEventParameters>): altShared.Events.EventHandler;

        // Player related events
        export function onPlayerConnect<T extends Player>(callback: GenericPlayerEventCallback<PlayerConnectEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerConnect<T extends Player>(callback: GenericPlayerEventCallback<PlayerConnectEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerConnectDenied(callback: GenericEventCallback<PlayerConnectDeniedEventParameters>): altShared.Events.EventHandler;
        export function oncePlayerConnectDenied(callback: GenericEventCallback<PlayerConnectDeniedEventParameters>): altShared.Events.EventHandler;
        export function onPlayerDisconnect<T extends Player>(callback: GenericPlayerEventCallback<PlayerDisconnectEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerDisconnect<T extends Player>(callback: GenericPlayerEventCallback<PlayerDisconnectEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerDamage<T extends Player>(callback: GenericPlayerEventCallback<PlayerDamageEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerDamage<T extends Player>(callback: GenericPlayerEventCallback<PlayerDamageEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerDeath<T extends Player>(callback: GenericPlayerEventCallback<PlayerDeathEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerDeath<T extends Player>(callback: GenericPlayerEventCallback<PlayerDeathEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerHeal<T extends Player>(callback: GenericPlayerEventCallback<PlayerHealEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerHeal<T extends Player>(callback: GenericPlayerEventCallback<PlayerHealEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerControlRequest<T extends Player>(callback: GenericCancellablePlayerEventCallback<PlayerControlRequestEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerControlRequest<T extends Player>(callback: GenericCancellablePlayerEventCallback<PlayerControlRequestEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerInteriorChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerInteriorChangeEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerInteriorChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerInteriorChangeEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerDimensionChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerDimensionChangeEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerDimensionChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerDimensionChangeEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerWeaponChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerWeaponChangeEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerWeaponChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerWeaponChangeEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerSyncedSceneRequest(callback: GenericCancellableEventCallback<PlayerSyncedSceneRequestEventParameters>): altShared.Events.EventHandler;
        export function oncePlayerSyncedSceneRequest(callback: GenericCancellableEventCallback<PlayerSyncedSceneRequestEventParameters>): altShared.Events.EventHandler;
        export function onPlayerSyncedSceneStart<T extends Player>(callback: GenericCancellablePlayerEventCallback<PlayerSyncedSceneStartEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerSyncedSceneStart<T extends Player>(callback: GenericCancellablePlayerEventCallback<PlayerSyncedSceneStartEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerSyncedSceneStop<T extends Player>(callback: GenericCancellablePlayerEventCallback<PlayerSyncedSceneStopEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerSyncedSceneStop<T extends Player>(callback: GenericCancellablePlayerEventCallback<PlayerSyncedSceneStopEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerSyncedSceneUpdate<T extends Player>(callback: GenericCancellablePlayerEventCallback<PlayerSyncedSceneUpdateEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerSyncedSceneUpdate<T extends Player>(callback: GenericCancellablePlayerEventCallback<PlayerSyncedSceneUpdateEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerSpawn<T extends Player>(callback: GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;
        export function oncePlayerSpawn<T extends Player>(callback: GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;
        export function onPlayerAnimationChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerAnimationChangeEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerAnimationChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerAnimationChangeEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerVehicleEntered<T extends Player>(callback: GenericPlayerEventCallback<PlayerVehicleEnteredEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerVehicleEntered<T extends Player>(callback: GenericPlayerEventCallback<PlayerVehicleEnteredEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerStartVehicleEnter<T extends Player>(callback: GenericPlayerEventCallback<PlayerStartVehicleEnterEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerStartVehicleEnter<T extends Player>(callback: GenericPlayerEventCallback<PlayerStartVehicleEnterEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerVehicleLeft<T extends Player>(callback: GenericPlayerEventCallback<PlayerVehicleLeftEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerVehicleLeft<T extends Player>(callback: GenericPlayerEventCallback<PlayerVehicleLeftEventParameters, T>): altShared.Events.EventHandler;
        export function onPlayerVehicleSeatChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerVehicleSeatChangeEventParameters, T>): altShared.Events.EventHandler;
        export function oncePlayerVehicleSeatChange<T extends Player>(callback: GenericPlayerEventCallback<PlayerVehicleSeatChangeEventParameters, T>): altShared.Events.EventHandler;

        export function onPlayerStartTalking<T extends Player>(callback: GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;
        export function oncePlayerStartTalking<T extends Player>(callback: GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;
        export function onPlayerStopTalking<T extends Player>(callback: GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;
        export function oncePlayerStopTalking<T extends Player>(callback: GenericPlayerEventCallback<{}, T>): altShared.Events.EventHandler;

        // Ped related events
        export function onPedHeal(callback: GenericEventCallback<PedHealEventParameters>): altShared.Events.EventHandler;
        export function oncePedHeal(callback: GenericEventCallback<PedHealEventParameters>): altShared.Events.EventHandler;

        export function onPedDeath(callback: GenericEventCallback<PedDeathEventParameters>): altShared.Events.EventHandler;
        export function oncePedDeath(callback: GenericEventCallback<PedDeathEventParameters>): altShared.Events.EventHandler;

        export function onPedDamage(callback: GenericEventCallback<PedDamageEventParameters>): altShared.Events.EventHandler;
        export function oncePedDamage(callback: GenericEventCallback<PedDamageEventParameters>): altShared.Events.EventHandler;

        // Vehicle related events
        export function onVehicleDestroy(callback: GenericEventCallback<VehicleDestroyEventParameters>): altShared.Events.EventHandler;
        export function onceVehicleDestroy(callback: GenericEventCallback<VehicleDestroyEventParameters>): altShared.Events.EventHandler;
        export function onVehicleAttach(callback: GenericEventCallback<VehicleAttachEventParameters>): altShared.Events.EventHandler;
        export function onceVehicleAttach(callback: GenericEventCallback<VehicleAttachEventParameters>): altShared.Events.EventHandler;
        export function onVehicleDetach(callback: GenericEventCallback<VehicleDetachEventParameters>): altShared.Events.EventHandler;
        export function onceVehicleDetach(callback: GenericEventCallback<VehicleDetachEventParameters>): altShared.Events.EventHandler;
        export function onVehicleDamage(callback: GenericEventCallback<VehicleDamageEventParameters>): altShared.Events.EventHandler;
        export function onceVehicleDamage(callback: GenericEventCallback<VehicleDamageEventParameters>): altShared.Events.EventHandler;
        export function onVehicleSirenStateChange(callback: GenericEventCallback<VehicleSirenStateChangeEventParameters>): altShared.Events.EventHandler;
        export function onceVehicleSirenStateChange(callback: GenericEventCallback<VehicleSirenStateChangeEventParameters>): altShared.Events.EventHandler;
        export function onVehicleHornStateChange<T extends Player>(callback: GenericCancellablePlayerEventCallback<VehicleHornStateChangeEventParameters, T>): altShared.Events.EventHandler;
        export function onceVehicleHornStateChange<T extends Player>(callback: GenericCancellablePlayerEventCallback<VehicleHornStateChangeEventParameters, T>): altShared.Events.EventHandler;

        // Voice related events
        export function onVoiceConnectionStateChange(callback: GenericEventCallback<VoiceConnectionStateChangeEventParameters>): altShared.Events.EventHandler;
        export function onceVoiceConnectionStateChange(callback: GenericEventCallback<VoiceConnectionStateChangeEventParameters>): altShared.Events.EventHandler;

        // Object related events
        export function onClientObjectDelete<T extends Player>(callback: GenericCancellablePlayerEventCallback<{}, T>): altShared.Events.EventHandler;
        export function onceClientObjectDelete<T extends Player>(callback: GenericCancellablePlayerEventCallback<{}, T>): altShared.Events.EventHandler;
        export function onClientObjectRequest<T extends Player>(callback: GenericCancellablePlayerEventCallback<ClientObjectEventParameters, T>): altShared.Events.EventHandler;
        export function onceClientObjectRequest<T extends Player>(callback: GenericCancellablePlayerEventCallback<ClientObjectEventParameters, T>): altShared.Events.EventHandler;

        // SHARED Entity related events
        export function onBaseObjectCreate(callback: GenericEventCallback<BaseObjectCreateEventParameters>): altShared.Events.EventHandler;
        export function onceBaseObjectCreate(callback: GenericEventCallback<BaseObjectCreateEventParameters>): altShared.Events.EventHandler;
        export function onBaseObjectRemove(callback: GenericEventCallback<BaseObjectRemoveEventParameters>): altShared.Events.EventHandler;
        export function onceBaseObjectRemove(callback: GenericEventCallback<BaseObjectRemoveEventParameters>): altShared.Events.EventHandler;
        export function onNetOwnerChange(callback: GenericEventCallback<NetOwnerChangeEventParameters>): altShared.Events.EventHandler;
        export function onceNetOwnerChange(callback: GenericEventCallback<NetOwnerChangeEventParameters>): altShared.Events.EventHandler;
        export function onWeaponDamage(callback: GenericCancellableEventCallback<WeaponDamageEventParameters>): altShared.Events.EventHandler;
        export function onceWeaponDamage(callback: GenericCancellableEventCallback<WeaponDamageEventParameters>): altShared.Events.EventHandler;

        // SHARED meta related events
        export function onMetaChange(callback: GenericEventCallback<MetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onLocalMetaChange<T extends Player>(callback: GenericPlayerEventCallback<LocalMetaChangeEventParameters, T>): altShared.Events.EventHandler;
        export function onceLocalMetaChange<T extends Player>(callback: GenericPlayerEventCallback<LocalMetaChangeEventParameters, T>): altShared.Events.EventHandler;
        export function onSyncedMetaChange(callback: GenericEventCallback<SyncedMetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onceSyncedMetaChange(callback: GenericEventCallback<SyncedMetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onStreamSyncedMetaChange(callback: GenericEventCallback<StreamSyncedMetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onceStreamSyncedMetaChange(callback: GenericEventCallback<StreamSyncedMetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onGlobalMetaChange(callback: GenericEventCallback<GlobalMetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onceGlobalMetaChange(callback: GenericEventCallback<GlobalMetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onGlobalSyncedMetaChange(callback: GenericEventCallback<GlobalSyncedMetaChangeEventParameters>): altShared.Events.EventHandler;
        export function onceGlobalSyncedMetaChange(callback: GenericEventCallback<GlobalSyncedMetaChangeEventParameters>): altShared.Events.EventHandler;

        // SHARED custom events
        export function onConsoleCommand(callback: GenericEventCallback<ConsoleCommandEventParameters>): altShared.Events.EventHandler;
        export function onceConsoleCommand(callback: GenericEventCallback<ConsoleCommandEventParameters>): altShared.Events.EventHandler;
        export function onError(callback: GenericEventCallback<ErrorEventParameters>): altShared.Events.EventHandler;
        export function onceError(callback: GenericEventCallback<ErrorEventParameters>): altShared.Events.EventHandler;

        // Script related events
        export function onColShapeEvent(callback: GenericEventCallback<ColShapeEventParameters>): altShared.Events.EventHandler;
        export function onceColShapeEvent(callback: GenericEventCallback<ColShapeEventParameters>): altShared.Events.EventHandler;
        export function onExplosion(callback: GenericCancellableEventCallback<ExplosionEventParameters>): altShared.Events.EventHandler;
        export function onceExplosion(callback: GenericCancellableEventCallback<ExplosionEventParameters>): altShared.Events.EventHandler;
        export function onFireStart<T extends Player>(callback: GenericCancellablePlayerEventCallback<FireStartEventParameters, T>): altShared.Events.EventHandler;
        export function onceFireStart<T extends Player>(callback: GenericCancellablePlayerEventCallback<FireStartEventParameters, T>): altShared.Events.EventHandler;
        export function onProjectileStart<T extends Player>(callback: GenericCancellablePlayerEventCallback<ProjectileStartEventParameters, T>): altShared.Events.EventHandler;
        export function onceProjectileStart<T extends Player>(callback: GenericCancellablePlayerEventCallback<ProjectileStartEventParameters, T>): altShared.Events.EventHandler;
        export function onEntityColShapeEnter(callback: GenericEventCallback<EntityColShapeEnterEventParameters>): altShared.Events.EventHandler;
        export function onceEntityColShapeEnter(callback: GenericEventCallback<EntityColShapeEnterEventParameters>): altShared.Events.EventHandler;
        export function onEntityColShapeLeave(callback: GenericEventCallback<EntityColShapeLeaveEventParameters>): altShared.Events.EventHandler;
        export function onceEntityColShapeLeave(callback: GenericEventCallback<EntityColShapeLeaveEventParameters>): altShared.Events.EventHandler;
        export function onEntityCheckpointEnter(callback: GenericEventCallback<EntityCheckpointEnterEventParameters>): altShared.Events.EventHandler;
        export function onceEntityCheckpointEnter(callback: GenericEventCallback<EntityCheckpointEnterEventParameters>): altShared.Events.EventHandler;
        export function onEntityCheckpointLeave(callback: GenericEventCallback<EntityCheckpointLeaveEventParameters>): altShared.Events.EventHandler;
        export function onceEntityCheckpointLeave(callback: GenericEventCallback<EntityCheckpointLeaveEventParameters>): altShared.Events.EventHandler;
        export function onGivePedScriptedTask(callback: GenericEventCallback<GivePedScriptedTaskEventParameters>): altShared.Events.EventHandler;
        export function onceGivePedScriptedTask(callback: GenericEventCallback<GivePedScriptedTaskEventParameters>): altShared.Events.EventHandler;

        // SHARED script related events
        export function onLocalScriptEvent<T = any[]>(callback: GenericEventCallback<ServerScriptEventParameters<T>>): altShared.Events.EventHandler;
        export function onceLocalScriptEvent<T = any[]>(callback: GenericEventCallback<ServerScriptEventParameters<T>>): altShared.Events.EventHandler;
        export function onRemoteScriptEvent<T = any[], U extends Player = Player>(callback: GenericPlayerEventCallback<PlayerScriptEventParameters<T>, U>): altShared.Events.EventHandler;
        export function onceRemoteScriptEvent<T = any[], U extends Player = Player>(callback: GenericPlayerEventCallback<PlayerScriptEventParameters<T>, U>): altShared.Events.EventHandler;

        // SHARED resource events
        export function onAnyResourceStart(callback: GenericEventCallback<ResourceStartEventParameters>): altShared.Events.EventHandler;
        export function onceAnyResourceStart(callback: GenericEventCallback<ResourceStartEventParameters>): altShared.Events.EventHandler;
        export function onAnyResourceStop(callback: GenericEventCallback<ResourceStopEventParameters>): altShared.Events.EventHandler;
        export function onceAnyResourceStop(callback: GenericEventCallback<ResourceStopEventParameters>): altShared.Events.EventHandler;

        export function onResourceStart(callback: GenericEventCallback): altShared.Events.EventHandler;
        export function onceResourceStart(callback: GenericEventCallback): altShared.Events.EventHandler;
        export function onResourceStop(callback: GenericEventCallback): altShared.Events.EventHandler;
        export function onceResourceStop(callback: GenericEventCallback): altShared.Events.EventHandler;

        // TODO: it also needs AnyResourceError?
        export function onResourceError(callback: GenericEventCallback<ResourceErrorEventParameters>): altShared.Events.EventHandler;
        export function onceResourceError(callback: GenericEventCallback<ResourceErrorEventParameters>): altShared.Events.EventHandler;

        // Custom events
        export function on<E extends keyof CustomServerEvent>(eventName: E, callback: CustomEventCallback<Parameters<CustomServerEvent[E]>>): altShared.Events.ScriptEventHandler;
        export function on<E extends string>(eventName: Exclude<E, keyof CustomServerEvent>, callback: CustomEventCallback<any[]>): altShared.Events.ScriptEventHandler;
        export function once<E extends keyof CustomServerEvent>(eventName: E, callback: CustomEventCallback<Parameters<CustomServerEvent[E]>>): altShared.Events.ScriptEventHandler;
        export function once<E extends string>(eventName: Exclude<E, keyof CustomServerEvent>, callback: CustomEventCallback<any[]>): altShared.Events.ScriptEventHandler;

        export function onPlayer<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends Player>(eventName: E, callback: CustomPlayerEventCallback<Parameters<altShared.Events.CustomPlayerToServerEvent[E]>, U>): altShared.Events.ScriptEventHandler;
        export function onPlayer<E extends string, U extends Player>(eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>, callback: CustomPlayerEventCallback<any[], U>): altShared.Events.ScriptEventHandler;
        export function oncePlayer<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends Player>(eventName: E, callback: CustomPlayerEventCallback<Parameters<altShared.Events.CustomPlayerToServerEvent[E]>, U>): altShared.Events.ScriptEventHandler;
        export function oncePlayer<E extends string, U extends Player>(eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent>, callback: CustomPlayerEventCallback<any[], U>): altShared.Events.ScriptEventHandler;

        export function onRemote<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends Player>(eventName: E, callback: CustomPlayerEventCallback<Parameters<altShared.Events.CustomPlayerToServerEvent[E]>, U>): altShared.Events.ScriptEventHandler;
        export function onRemote<E extends keyof altShared.Events.CustomRemoteEvent, U extends Player>(eventName: E, callback: CustomPlayerEventCallback<Parameters<altShared.Events.CustomRemoteEvent[E]>, U>): altShared.Events.ScriptEventHandler;
        export function onRemote<E extends string, U extends Player>(eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent | keyof altShared.Events.CustomRemoteEvent>, callback: CustomPlayerEventCallback<any[], U>): altShared.Events.ScriptEventHandler;
        export function onceRemote<E extends keyof altShared.Events.CustomPlayerToServerEvent, U extends Player>(eventName: E, callback: CustomPlayerEventCallback<Parameters<altShared.Events.CustomPlayerToServerEvent[E]>, U>): altShared.Events.ScriptEventHandler;
        export function onceRemote<E extends keyof altShared.Events.CustomRemoteEvent, U extends Player>(eventName: E, callback: CustomPlayerEventCallback<Parameters<altShared.Events.CustomRemoteEvent[E]>, U>): altShared.Events.ScriptEventHandler;
        export function onceRemote<E extends string, U extends Player>(eventName: Exclude<E, keyof altShared.Events.CustomPlayerToServerEvent | keyof altShared.Events.CustomRemoteEvent>, callback: CustomPlayerEventCallback<any[], U>): altShared.Events.ScriptEventHandler;

        export function setWarningThreshold(threshold: number): void;
        export function setSourceLocationFrameSkipCount(skipCount: number): void;

        export function onEvent(callback: GenericEventCallback<altShared.Events.GenericOnEventParameters>): altShared.Events.GenericEventHandler;

        interface ConnectionQueueEventParameters {
            connectionInfo: ConnectionInfo;
        }

        interface PlayerConnectEventParameters {}

        interface PlayerConnectDeniedEventParameters {
            reason: altShared.Enums.ConnectDeniedReason;
            name: string;
            ip: string;
            passwordHash: number;
            isDebug: boolean;
            branch: string;
            versionMajor: number;
            versionMinor: number;
            cdnUrl: string;
            discordID: number;
        }

        interface PlayerDisconnectEventParameters {
            reason: string;
        }

        interface PlayerDamageEventParameters {
            attacker?: Entity;
            healthDamage: number;
            armourDamage: number;
            weaponHash: number;
        }

        interface PlayerDeathEventParameters {
            killer?: Entity;
            weaponHash: number;
        }

        interface PlayerHealEventParameters {
            newHealth: number;
            oldHealth: number;
            newArmour: number;
            oldArmour: number;
        }

        interface PlayerControlRequestEventParameters {
            target: Entity;
        }

        interface PlayerInteriorChangeEventParameters {
            oldInterior: number;
            newInterior: number;
        }

        interface PlayerDimensionChangeEventParameters {
            oldDimension: number;
            newDimension: number;
        }

        interface PlayerWeaponChangeEventParameters {
            oldWeapon: number;
            newWeapon: number;
        }

        interface PlayerSyncedSceneRequestEventParameters {
            sceneID: number;
        }

        interface PlayerSyncedSceneStartEventParameters {
            sceneID: number;
            startPos: altShared.Vector3;
            startRot: altShared.Vector3;
            animDict: string;
        }

        interface PlayerSyncedSceneStopEventParameters {
            sceneID: number;
        }

        interface PlayerSyncedSceneUpdateEventParameters {
            sceneID: number;
            startRate: number;
        }

        interface ColShapeEventParameters {
            entity: WorldObject;
            target: ColShape;
            state: boolean;
        }

        interface ExplosionEventParameters {
            source: Player;
            type: altShared.Enums.ExplosionType;
            pos: altShared.Vector3;
            fx: number;
            target?: Entity;
        }

        interface FireStartEventParameters {
            fires: {
                pos: altShared.Vector3;
                weaponHash: number;
            }[];
        }

        interface ProjectileStartEventParameters {
            pos: altShared.Vector3;
            dir: altShared.Vector3;
            ammoHash: number;
            weaponHash: number;
        }

        interface EntityColShapeEnterEventParameters {
            entity: WorldObject;
            colShape: ColShape;
        }

        interface EntityColShapeLeaveEventParameters {
            entity: WorldObject;
            colShape: ColShape;
        }

        interface EntityCheckpointEnterEventParameters {
            entity: WorldObject;
            colShape: ColShape;
        }

        interface EntityCheckpointLeaveEventParameters {
            entity: WorldObject;
            colShape: ColShape;
        }

        interface GivePedScriptedTaskEventParameters {
            source: Player;
            target: Ped;
            taskType: number;
        }

        interface CustomServerEvent {}

        interface ScriptRPCEventParameters {
            readonly name: string;
            readonly args: ReadonlyArray<unknown>;
            readonly answerID: number;

            willAnswer(): boolean;

            answer(...args: unknown[]): void;
            answerWithError(errorMessage: string): boolean;
        }

        interface ScriptRPCAnswerEventParameters {
            readonly answerID: number;
            readonly answer: unknown;
            readonly answerError: string;
        }

        export type EventContext = {
            readonly type: altShared.Enums.EventType;
            readonly isCancellable: boolean;
        };

        export type PlayerEventContext<T extends Player> = EventContext & {
            readonly player: T;
        };

        export type CancellableEventContext = {
            cancel(): void;
            readonly isCancelled: boolean;
        };

        export type CustomEventCallback<T extends unknown[]> = (...params: T) => void | Promise<void>;
        export type CustomPlayerEventCallback<T extends unknown[], U extends Player = Player> = (player: U, ...params: T) => void | Promise<void>;

        export type GenericEventCallback<T extends {} = {}> = (params: T & EventContext) => void | Promise<void>;
        export type GenericPlayerEventCallback<T extends {} = {}, U extends Player = Player> = (params: T & PlayerEventContext<U>) => void | Promise<void>;

        export type GenericCancellableEventCallback<T = {}> = (params: T & EventContext & CancellableEventContext) => void | Promise<void>;
        export type GenericCancellablePlayerEventCallback<T = {}, U extends Player = Player> = (params: T & PlayerEventContext<U> & CancellableEventContext) => void | Promise<void>;

        interface ServerScriptEventParameters<T> {
            eventName: string;
            args: T;
        }

        interface PlayerScriptEventParameters<T> {
            eventName: string;
            args: T;
        }

        interface PlayerAnimationChangeEventParameters {
            oldAnimDict: number;
            newAnimDict: number;
            oldAnimName: number;
            newAnimName: number;
        }

        interface PlayerVehicleEnteredEventParameters {
            vehicle: Vehicle;
            seat: number;
        }

        interface PlayerStartVehicleEnterEventParameters {
            vehicle: Vehicle;
            seat: number;
        }

        interface PlayerVehicleLeftEventParameters {
            vehicle: Vehicle;
            seat: number;
        }

        interface PlayerVehicleSeatChangeEventParameters {
            vehicle: Vehicle;
            oldSeat: number;
            newSeat: number;
        }

        interface PedHealEventParameters {
            readonly ped: Ped;

            newHealth: number;
            oldHealth: number;

            newArmour: number;
            oldArmour: number;
        }

        interface PedDeathEventParameters {
            ped: Ped;
            killer: Entity;
            weapon: number;
        }

        interface PedDamageEventParameters {
            ped: Ped;
            attacker: Entity;
            healthDamage: number;
            armourDamage: number;
            weapon: number;
        }

        interface VehicleDestroyEventParameters {
            vehicle: Vehicle;
        }

        interface VehicleAttachEventParameters {
            vehicle: Vehicle;
            attachedVehicle: Vehicle;
        }

        interface VehicleDetachEventParameters {
            vehicle: Vehicle;
            detachedVehicle: Vehicle;
        }

        interface VehicleDamageEventParameters {
            vehicle: Vehicle;
            attacker: Entity;
            bodyHealthDamage: number;
            additionalBodyHealthDamage: number;
            engineHealthDamage: number;
            petrolTankDamage: number;
            weaponHash: number;
        }

        interface VehicleSirenStateChangeEventParameters {
            vehicle: Vehicle;
            state: boolean;
        }

        interface VehicleHornStateChangeEventParameters {
            vehicle: Vehicle;
            state: boolean;
        }

        interface VoiceConnectionStateChangeEventParameters {
            state: altShared.Enums.VoiceConnectionState;
        }

        interface ClientObjectEventParameters {
            model: number;
            pos: altShared.Vector3;
        }

        interface BaseObjectCreateEventParameters {
            object: altShared.BaseObject;
        }

        interface BaseObjectRemoveEventParameters {
            object: altShared.BaseObject;
        }

        interface NetOwnerChangeEventParameters {
            entity: Entity;
            oldOwner?: Player;
            newOwner?: Player;
        }

        interface WeaponDamageEventParameters {
            source: Player;
            target: Entity;
            weaponHash: number;
            damage: number;
            offset: altShared.Vector3;
            bodyPart: altShared.Enums.BodyPart;

            setDamageValue(value: number): void;
        }

        interface MetaChangeEventParameters {
            entity: BaseObject;
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface LocalMetaChangeEventParameters {
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface SyncedMetaChangeEventParameters {
            entity: Entity;
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface StreamSyncedMetaChangeEventParameters {
            entity: Entity;
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface GlobalMetaChangeEventParameters {
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface GlobalSyncedMetaChangeEventParameters {
            key: string;
            oldValue: unknown;
            newValue: unknown;
        }

        interface ConsoleCommandEventParameters {
            command: string;
            args: string[];
        }

        interface ErrorEventParameters {
            error: Error;
            stack: string;
            location: altShared.SourceLocation;
        }

        interface ResourceStartEventParameters {
            resource: Resource;
        }

        interface ResourceStopEventParameters {
            resource: Resource;
        }

        interface ResourceErrorEventParameters {
            resource: Resource;
        }
    }

    export namespace Security {
        export namespace EventProtection {
            let enabled: boolean;
            /** Default: 5000 */
            let cleanupInterval: number;
            /** Default: 20 */
            let maxEventsPerInterval: number;
            let notifyCallback: ((player: Player, event: string) => void) | null;

            function ignorePlayer(player: Player): void;
            function unignorePlayer(player: Player): void;
            function ignoreEvent(event: string): void;
            function unignoreEvent(event: string): void;
            function addCustomEventMax(event: string, max: number): void;
            function removeCustomEventMax(event: string, max: number): void;
        }
    }

    /**
     * Extend it by interface merging for use in BaseObject#meta.
     */
    export interface BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in Blip#meta.
     */
    export interface BlipMeta extends BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in Marker#meta.
     */
    export interface MarkerMeta extends BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in ColShape#meta.
     */
    export interface ColShapeMeta extends BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in Checkpoint#meta.
     */
    export interface CheckpointMeta extends ColShapeMeta {}

    /**
     * Extend it by interface merging for use in VoiceChannel#meta.
     */
    export interface VoiceChannelMeta extends BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in Entity#meta.
     */
    export interface EntityMeta extends BaseObjectMeta {}

    /**
     * Extend it by interface merging for use in Player#meta.
     */
    export interface PlayerMeta extends EntityMeta {}

    /**
     * Extend it by interface merging for use in Player#meta.
     */
    export interface PlayerLocalMeta extends EntityMeta {}

    /**
     * Extend it by interface merging for use in Vehicle#meta.
     */
    export interface VehicleMeta extends EntityMeta {}

    /**
     * Extend it by interface merging for use in Ped#meta.
     */
    export interface PedMeta extends EntityMeta {}

    /**
     * Extend it by interface merging for use in Object#meta.
     */
    export interface ObjectMeta extends EntityMeta {}

    /**
     * Extend it by interface merging for use in VirtualEntity#meta.
     */
    export interface VirtualEntityMeta extends BaseObjectMeta {}

    interface StreamedInPlayerEntities {
        entity: Entity;

        /**
         * The squared and rounded-up distance to the entity.
         *
         * To obtain an approximation of the actual distance, you can calculate
         * the square root of this value.
         */
        distance: number;
    }

    export * from "@altv/shared";
}
