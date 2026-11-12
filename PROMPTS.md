# Quy trình tạo ảnh món bằng AI

Web tự dùng ảnh thật nếu có file `images/dishes/<tên-file>.jpg`; món nào chưa có thì hiện ảnh minh hoạ SVG. Không cần sửa code.

## Quy trình
1. **Lấy tên món** từ tab *Menu tuần* (hoặc bảng dưới). Mỗi tuần bếp gửi menu mới → tạo ảnh cho món mới.
2. **Gen ảnh** (ChatGPT / Midjourney / Gemini…) bằng prompt bên dưới: dán `STYLE` vào cuối prompt món.
3. **Kiểm tra**: đúng nguyên liệu, đúng chay/mặn, ít tinh bột (lowcarb: ít cơm/mì, nhiều rau-đạm), không có chữ/logo/watermark.
4. **Lưu file** dạng JPG, tỉ lệ **4:3** (vd 1200×900), nhẹ dưới ~300 KB, vào `images/dishes/`.
5. **Đặt tên file** đúng theo cột "File" (tên món bỏ dấu, chữ thường, dấu gạch ngang). Món mới: tự tạo tên theo quy tắc này (vd "Bún chả chay" → `bun-cha-chay.jpg`).
6. **Đẩy lên GitHub** (kéo thả file vào repo trên web, hoặc `git add images/dishes && git commit && git push`). Pages cập nhật sau 1–2 phút, bấm Ctrl+Shift+R để thấy.

## STYLE (dán cuối mỗi prompt)
```
Appetizing food photography, top-down 45-degree view, served in a white ceramic bowl on a light wooden table, soft natural window light, fresh and healthy, vibrant natural colors, shallow depth of field, clean minimal background with a few green leaves, realistic, no text, no logo, no watermark, no hands, 4:3 aspect ratio.
```
Gợi ý thêm cho món **chay**: thêm `strictly vegetarian, no meat, no fish`. Cho món **lowcarb**: thêm `low-carb healthy meal, small portion of carbs, more vegetables and protein`.

## Bảng món ↔ tên file
| Món | Loại | File |
|---|---|---|
| Nui trộn ngũ sắc | Chay | `nui-tron-ngu-sac.jpg` |
| Cơm lứt phù trúc xào sả ớt kèm đậu | Chay | `com-lut-phu-truc-xao-sa-ot-kem-dau.jpg` |
| Miến trộn kèm bò sốt tiêu đen | Mặn | `mien-tron-kem-bo-sot-tieu-den.jpg` |
| Cơm lứt chả rim trứng cút | Mặn | `com-lut-cha-rim-trung-cut.jpg` |
| Cơm lứt nấm đậu xào lăn | Chay | `com-lut-nam-dau-xao-lan.jpg` |
| Bánh canh nấm rau củ (món nước) | Chay | `banh-canh-nam-rau-cu-mon-nuoc.jpg` |
| Cơm lứt thịt ghim nước dừa | Mặn | `com-lut-thit-ghim-nuoc-dua.jpg` |
| Khoai ngọt kèm má đùi gà sốt mật ong | Mặn | `khoai-ngot-kem-ma-dui-ga-sot-mat-ong.jpg` |
| Mì Quảng trộn thập cẩm | Chay | `mi-quang-tron-thap-cam.jpg` |
| Cơm lứt kèm tempeh lúc lắc | Chay | `com-lut-kem-tempeh-luc-lac.jpg` |
| Salad cá ngừ sốt dầu giấm | Mặn | `salad-ca-ngu-sot-dau-giam.jpg` |
| Cơm lứt heo xào sả ớt | Mặn | `com-lut-heo-xao-sa-ot.jpg` |
| Cơm Dương Châu ngũ sắc | Chay | `com-duong-chau-ngu-sac.jpg` |
| Bánh hỏi kèm nấm nướng | Chay | `banh-hoi-kem-nam-nuong.jpg` |
| Cơm đậu xanh cá sapa nướng sate | Mặn | `com-dau-xanh-ca-sapa-nuong-sate.jpg` |
| Mì ý gà sốt kem nấm | Mặn | `mi-y-ga-sot-kem-nam.jpg` |
| Bẩu xì dùn (bún xì dầu/bún nước tương) | Chay | `bau-xi-dun.jpg` |
| Cơm lứt gỏi nấm | Chay | `com-lut-goi-nam.jpg` |
| Bún lứt gà nướng Teriyaki | Mặn | `bun-lut-ga-nuong-teriyaki.jpg` |
| Cơm lứt heo sốt Thái | Mặn | `com-lut-heo-sot-thai.jpg` |

## Prompt từng món (thay `{STYLE}` bằng đoạn STYLE ở trên)
### Nui trộn ngũ sắc  → `nui-tron-ngu-sac.jpg`
```
Overhead photo of pasta shells (nui) tossed with colorful vegetables: carrot, green peas, cherry tomato, broccoli, sweet corn, light olive-oil dressing. {STYLE}
```

### Cơm lứt phù trúc xào sả ớt kèm đậu  → `com-lut-phu-truc-xao-sa-ot-kem-dau.jpg`
```
Overhead photo of brown rice with stir-fried tofu skin (phù trúc) strips with lemongrass and chili, green beans. {STYLE}
```

### Miến trộn kèm bò sốt tiêu đen  → `mien-tron-kem-bo-sot-tieu-den.jpg`
```
Overhead photo of glass noodle (miến) salad with sliced black-pepper beef, scallion, herbs, sliced chili. {STYLE}
```

### Cơm lứt chả rim trứng cút  → `com-lut-cha-rim-trung-cut.jpg`
```
Overhead photo of brown rice with braised Vietnamese fish cake slices (chả rim), quail eggs, cucumber slices. {STYLE}
```

### Cơm lứt nấm đậu xào lăn  → `com-lut-nam-dau-xao-lan.jpg`
```
Overhead photo of brown rice with stir-fried mushrooms (shiitake, enoki) and green beans, light glaze. {STYLE}
```

### Bánh canh nấm rau củ (món nước)  → `banh-canh-nam-rau-cu-mon-nuoc.jpg`
```
Overhead photo of Vietnamese thick-noodle soup (bánh canh) with mushrooms, carrot, tofu, scallion in clear golden vegetarian broth. {STYLE}
```

### Cơm lứt thịt ghim nước dừa  → `com-lut-thit-ghim-nuoc-dua.jpg`
```
Overhead photo of brown rice with coconut-water braised pork (thịt kho nước dừa) and a halved boiled egg, scallion, cucumber. {STYLE}
```

### Khoai ngọt kèm má đùi gà sốt mật ong  → `khoai-ngot-kem-ma-dui-ga-sot-mat-ong.jpg`
```
Overhead photo of roasted sweet potato chunks with honey-glazed chicken thigh, mixed greens, cherry tomato (low-carb friendly). {STYLE}
```

### Mì Quảng trộn thập cẩm  → `mi-quang-tron-thap-cam.jpg`
```
Overhead photo of vegetarian mì Quảng dry-mixed turmeric rice noodles with peanuts, herbs, tofu, tomato, lime wedge, rice cracker. {STYLE}
```

### Cơm lứt kèm tempeh lúc lắc  → `com-lut-kem-tempeh-luc-lac.jpg`
```
Overhead photo of brown rice with shaking-style tempeh cubes (lúc lắc), broccoli, sliced chili, cucumber. {STYLE}
```

### Salad cá ngừ sốt dầu giấm  → `salad-ca-ngu-sot-dau-giam.jpg`
```
Overhead photo of tuna salad on fresh greens with cherry tomato, cucumber, sweet corn, boiled egg, olive-oil vinaigrette (low-carb). {STYLE}
```

### Cơm lứt heo xào sả ớt  → `com-lut-heo-xao-sa-ot.jpg`
```
Overhead photo of brown rice with stir-fried pork with lemongrass and chili, scallion, cucumber. {STYLE}
```

### Cơm Dương Châu ngũ sắc  → `com-duong-chau-ngu-sac.jpg`
```
Overhead photo of colorful vegetarian Yangzhou fried rice with carrot, peas, corn, egg, scallion. {STYLE}
```

### Bánh hỏi kèm nấm nướng  → `banh-hoi-kem-nam-nuong.jpg`
```
Overhead photo of Vietnamese bánh hỏi rice vermicelli bundles with grilled mushrooms, scallion oil, chili fish-sauce-free dipping sauce. {STYLE}
```

### Cơm đậu xanh cá sapa nướng sate  → `com-dau-xanh-ca-sapa-nuong-sate.jpg`
```
Overhead photo of mung-bean rice with grilled basa/sapa fish fillet brushed with satay sauce, cucumber, tomato. {STYLE}
```

### Mì ý gà sốt kem nấm  → `mi-y-ga-sot-kem-nam.jpg`
```
Overhead photo of spaghetti with creamy mushroom sauce and sliced grilled chicken breast, parsley. {STYLE}
```

### Bẩu xì dùn (bún xì dầu/bún nước tương chay) → `bau-xi-dun.jpg`
```
Overhead photo of vegetarian Vietnamese dry rice vermicelli with light soy sauce dressing, tofu, sauteed mushrooms, cucumber, shredded carrot, lettuce, herbs and a few peanuts. Small noodle portion, plenty of vegetables, no meat, fish, fish sauce, seafood or animal broth. Not salad rolls and not soup. {STYLE}
```

### Cơm lứt gỏi nấm  → `com-lut-goi-nam.jpg`
```
Overhead photo of brown rice with Vietnamese mushroom salad (gỏi nấm): enoki, king oyster, carrot, herbs, lime dressing. {STYLE}
```

### Bún lứt gà nướng Teriyaki  → `bun-lut-ga-nuong-teriyaki.jpg`
```
Overhead photo of brown-rice vermicelli with teriyaki grilled chicken, broccoli, carrot, sesame seeds. {STYLE}
```

### Cơm lứt heo sốt Thái  → `com-lut-heo-sot-thai.jpg`
```
Overhead photo of brown rice with sliced pork in sweet-chili Thai sauce, cucumber, lime wedge. {STYLE}
```

## Prompt cho món mới (mẫu)
```
Overhead photo of <mô tả nguyên liệu thật của món, chay hay mặn>. {STYLE}
```
