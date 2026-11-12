# LaLa Lunch – Web đặt cơm nhóm
Web tĩnh (1 file `index.html`) để đặt combo, chọn món theo ngày, nhập menu tuần. Dữ liệu chung lưu trong Cloudflare D1 qua Worker `lala-lunch-sync`. Mỗi người nhập mã nhóm một lần trong tab **Dữ liệu**; web tự đồng bộ khoảng 15 giây. Nếu chưa nhập mã, dữ liệu chỉ lưu trong trình duyệt.

Mã nhóm được cấu hình bằng secret `GROUP_TOKEN` của Worker, không lưu trong GitHub. Worker và cấu hình nằm trong `cloudflare/` và `wrangler.jsonc`. Khi cập nhật Worker, chạy `npx wrangler deploy`. Nếu tạo D1 mới, chạy `npx wrangler d1 execute lala-lunch-orders --remote --file=cloudflare/schema.sql` trước khi deploy.
Ảnh món: minh hoạ SVG (`dish-art.js`); ảnh AI thả vào `images/dishes/` – xem `PROMPTS.md`.
