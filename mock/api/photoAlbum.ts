import MockAdapter from "axios-mock-adapter";
import photoAlbumData from "../json/photoAlbum.json";

// MOCKUP: 사진게시판
const mockPhotoAlbum = (mock: MockAdapter) => {
  // 전체 목록 조회
  mock.onGet("/api/photo-post").reply((config) => {
    const { page } = config.params;
    const PAGE_SIZE = 10;

    const startIdx = (page - 1) * PAGE_SIZE;
    const endIdx = page * PAGE_SIZE;
    const paginatedItems = photoAlbumData["photo-album"].slice(
      startIdx,
      endIdx
    );

    return [
      200,
      {
        response: {
          dtoList: paginatedItems,
        },
      },
    ];
  });

  // 상세 조회
  mock.onGet(/\/api\/photo-post\/\d+/).reply((config) => {
    const photoAlbumItem = photoAlbumData["photo-album-item"];

    return [
      200,
      {
        response: photoAlbumItem,
      },
    ];
  });
};
export default mockPhotoAlbum;
