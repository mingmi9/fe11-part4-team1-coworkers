import dayjs from "dayjs";

/* 사용 예시
첫 번쨰 인자 : 변환할 데이터
두 번쨰 인자 : 변환할 포맷

e.g. 2024년 1월 1일
const formattedDate = formatDate(mockTaskData.updatedAt, "YYYY년 M월 D일");

e.g. 2024.1.1
const formattedDate = formatDate(mockTaskData.updatedAt, "YYYY.M.D");
*/

export const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format);
};