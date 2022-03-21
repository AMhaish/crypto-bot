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
<<<<<<< HEAD
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
=======
        Success: 200, //"Success, let’s use it in update operations, delete operations, forget password, update password, update profile, resend password"
        SuccessAndContinue: 204,
        NotRegistered: 401, //"Email is not registered in login"
        EmailExist: 402, // "Email is already exists or confirmed in register and confirm",
        GeneralError: 400, // "General error, we will add more description after the status, or bad request",
        UnauthorizedAceess: 401, // "Unauthorized access, when updating and deleting resource that is not owned by the user",
        EntityExistException: 402, //  "Entity with the same name is already exists",
        NotFound: 404, // "Updating or deleting entity not found, or user is not registered"
        NotConfirmed: 403, // Not confirmed
        ForbiddenError: 403, // Its not allowed to do that
        ServiceUnavailable: 503, // If database, Redis ... etc is unavailable
>>>>>>> fb3a8bc (Updates to make it work)
    };
}

export default Constants;