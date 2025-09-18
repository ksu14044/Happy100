import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../apis/authApi";

export function useSignUpMutation() {
    return useMutation({
        mutationFn: signUpApi,
        retry: 0,
    });
}
