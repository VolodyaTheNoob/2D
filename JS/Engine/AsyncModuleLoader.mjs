export class ModuleLoader{
    constructor(Path,AttachFunc,FuncArgc){
        this.Path = Path;
        this.Func = AttachFunc;
        this.Args = FuncArgc;
    }
    async LoadModule(ModulePath) {
        const myModule = await import(this.Path);
        this.Func(this.Args);
    }
}
