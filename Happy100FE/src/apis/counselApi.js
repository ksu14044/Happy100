import { api } from "../configs/axiosConfig";

export async function submitCounselApplication(type, payload) {
    if (!type) {
        throw new Error("상담 유형이 지정되지 않았습니다.");
    }

    const formData = new FormData();
    formData.append("name", payload.name ?? "");
    formData.append("phone", payload.phone ?? "");
    formData.append("email", payload.email ?? "");
    formData.append("subject", payload.subject ?? "");
    formData.append("message", payload.message ?? "");
    formData.append("privacyAgreement", payload.privacyAgreement ? "true" : "false");

    if (payload.attachments?.length) {
        payload.attachments.forEach((file) => {
            if (file) {
                formData.append("attachments", file);
            }
        });
    }

    await api.post(`/api/counsel/${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}
