// GET: 앨범 단건 조회 함수
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ICommentDto, IPhotoAlbumFileDto, IPhotoPostDto } from '../types';

interface IPhotoAlbumData {
    photoPostDto: IPhotoPostDto;
    fileDtoList: IPhotoAlbumFileDto[];
    commentDtoList: ICommentDto[];
    memberLiked: boolean;
}

const useGetPhotoAlbumData = (boardId: string) =>
    useQuery<IPhotoAlbumData>({
        queryKey: ['album', boardId],
        queryFn: async () => {
            const albumURL = `/api/photo-post/${boardId}`;

            return await axios.get(albumURL).then(res => res.data.response);
        },
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: true,
    });

export default useGetPhotoAlbumData;
