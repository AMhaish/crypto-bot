class Constants {
    static AccessLevels = {
        Anynomous: "Anynomous",
        Authenticated: "Authenticated",
        UserOnCompany: "USER",
        AdminOnCompany: "ADMIN",
        AgnetOnCompany: "AGENT",
    };

    static HttpMethods = { GET: "GET", HEAD: "HEAD", POST: "POST", PUT: "PUT", PATCH: "PATCH", DELETE: "DELETE", OPTIONS: "OPTIONS", TRACE: "TRACE" };

    static StatusCodes = {
        Success: 200,
        SuccessAndContinue: 204,
        NotRegistered: 401,
        EmailExist: 402,
        GeneralError: 400,
        UnauthorizedAceess: 401,
        EntityExistException: 402,
        NotFound: 404,
        NotConfirmed: 403,
        ForbiddenError: 403,
        ServiceUnavailable: 503,
    };
}

export default Constants;