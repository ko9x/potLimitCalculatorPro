export class ParentProvider {

    public platform: any;
    constructor( platform ) {
        this.platform = platform
    }

    processSuccess( response ): any{
        return {
            success: true,
            data: response
        };
    }

    processError( response ) {
        return {
            success: false,
            error: response.error
        };
    }



}