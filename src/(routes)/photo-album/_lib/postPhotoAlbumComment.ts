import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// POST: 댓글 작성
const useCreateComment = () => {
    const queryClient = useQueryClient();
    const { boardId } = useParams();

    return useMutation({
        mutationFn: async (newComment: string) => {
            const commentPostURL = `/api/comment/${boardId}`;

            return await axios.post(commentPostURL, {
                content: newComment,
            });
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['album', boardId] });
        },
        // 에러 처리
        onError: () => {
            window.alert('댓글 작성에 실패했습니다.');
        },
    });
};

export default useCreateComment;
