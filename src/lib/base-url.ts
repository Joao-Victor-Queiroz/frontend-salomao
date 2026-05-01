export function getBaseUrl(){
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 

    if(!baseUrl) {
        throw new Error("A BASE_URL não foi definida nas variáves de ambiente");
    }

    return baseUrl;
}