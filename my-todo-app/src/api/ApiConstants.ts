export const ApiConstants = {
    TODO:{
        ADD : (userId: number) =>{
            return "/todos/" + userId;
        },
        FIND_NOT_COMPLETED: (userId : number)=>{
            return "/todos/notCompleted/" + userId;
        },
        FIND_COMPLETED: (userId : number)=>{
            return "/todos/completed/" + userId;
        },
        MARK_COMPLETE: (todoId : number)=>{
            return "/todos/update/" + todoId;
        },
        DELETE :(todoId : number) =>{
            return "/todos/delete/" + todoId;
        }
    },

    USER :{
        SIGN_UP :"/users/signup",
        FIND_ALL:"/users/details",
        USER_DELETE:(userId : number)=>{
            return"/users/delete/" + userId;
        }

    },
      AUTH:{
        LOGIN : "/auth/login",
        GOOGLE_LOGIN_PAGE : "/auth/google/login",
        GOOGLE_AUTH : "auth/google/callback",
      }
};