# 인덱스 및 검색 성능 개선 가이드

현재 쿼리는 `LIKE '%키워드%'` 패턴과 `LOWER(...)`를 사용하므로 일반 B-Tree 인덱스를 효과적으로 활용하기 어렵습니다. 기능 변경 없이 성능을 개선하려면 DB 스키마 수준의 인덱싱/전문화가 필요합니다.

## 권장 사항 (MySQL 8.0 기준)

- 사용자명 검색
  - 기본 컬레이션이 대소문자 구분이 없다면 `LOWER(u.username)`는 제거 가능하며, `username`에 일반 인덱스를 둡니다. 단, 접미 `%`가 있는 패턴에서는 인덱스 사용이 제한됩니다.
  - 대안: 접두 검색으로 UX를 변경하거나, ngram/trigram 인덱스(외부 플러그인) 또는 FULLTEXT를 도입합니다.

```sql
-- 사용자명 정렬/조회 보조 인덱스
CREATE INDEX idx_user_tb_created_at ON user_tb (created_at DESC);
CREATE INDEX idx_user_tb_username ON user_tb (username);
```

- 게시글 검색
  - 제목/본문에 대해 FULLTEXT 인덱스를 고려합니다. 본문이 JSON 문자열이라면, 별도 컬럼으로 정규화하여 본문 텍스트만 저장 후 FULLTEXT 인덱스를 적용하는 방식이 가장 효과적입니다.

```sql
-- MySQL 8.0: FULLTEXT 인덱스 (InnoDB 지원)
ALTER TABLE board_post
  ADD FULLTEXT INDEX ft_board_post_title (title),
  ADD FULLTEXT INDEX ft_board_post_content (content_json);

-- 혹은, content_text 컬럼을 추가하여 본문 순수 텍스트만 저장 후 FULLTEXT 인덱스 권장
-- ALTER TABLE board_post ADD COLUMN content_text TEXT;
-- ALTER TABLE board_post ADD FULLTEXT INDEX ft_board_post_content_text (content_text);
```

> 주의: FULLTEXT 도입 시 쿼리는 `MATCH(title) AGAINST (? IN BOOLEAN MODE)` 형태로 변경해야 최대 효과를 얻습니다. 현재 코드를 바꾸지 않으려면 우선 정렬/페이지 관련 인덱스(`board_type`, `deleted_yn`, `created_at`)를 추가하는 것만으로도 체감 개선이 있을 수 있습니다.

```sql
-- 목록/카운트 쿼리 보조 인덱스 (삭제/게시판/정렬)
CREATE INDEX idx_board_post_boardtype_deleted_created ON board_post (deleted_yn, board_type, created_at DESC);
```

## 운영 팁

- 쿼리 실행 계획(EXPLAIN)을 확인하여 인덱스 사용 여부를 점검하세요.
- 데이터가 증가하면 인덱스 선택도가 떨어지므로, 통계 갱신과 주기적 점검이 필요합니다.

