import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import isServerError from '../../../_errors/isServerError';

// REST: 사진 등록
export const usePostLife4CutPhoto = () => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, AxiosError, FormData>({
        mutationFn: async fileFormData => {
            const photoZoneURL = '/api/life4cut/save';
            return await axios.post(photoZoneURL, fileFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['photo-zone'] });
        },
        // 에러 처리
        onError: async e => {
            let errorMessage = '알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요.';
            if (isServerError(e) && e.response.data && e?.response?.data?.message) {
                errorMessage = e.response.data.message;
                if (e.response.status === 403) {
                    errorMessage = '권한이 없는 사용자입니다.';
                } else if (e.response.status === 401) {
                    errorMessage = '사진은 로그인 후 올릴 수 있습니다!';
                } else if (e.response.status === 404) {
                    errorMessage = '사진 등록에 실패하였습니다.';
                } else if (e.response.status === 500) {
                    errorMessage = '사진 등록에 실패하였습니다. 관리자에게 문의해주세요.';
                }
                alert(errorMessage);
                return;
            }
            alert(errorMessage);
        },
    });
};
