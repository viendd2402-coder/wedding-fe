import type { AppLanguage } from "@/components/global-preferences-provider";

export type ProfileMessages = {
  backHome: string;
  title: string;
  subtitle: string;
  body: string;
  sectionDetails: string;
  sectionOptional: string;
  additionalContact: string;
  email: string;
  name: string;
  phone: string;
  age: string;
  gender: string;
  changePhoto: string;
  avatarUrlHint: string;
  genderMale: string;
  genderFemale: string;
  genderOther: string;
  genderUnspecified: string;
  save: string;
  saving: string;
  saved: string;
  reset: string;
  loading: string;
  retry: string;
  logout: string;
  needLogin: string;
  goLogin: string;
  imageTooBig: string;
  imageType: string;
  dataUrlTooLong: string;
  previewHint: string;
  changeAvatarShort: string;
  optionalFieldHint: string;
  messengerExampleHint: string;
  fullNameTooLong: string;
  phoneTooLong: string;
  ageInvalid: string;
  genderTooLong: string;
  additionalContactTooLong: string;
};

const vi: ProfileMessages = {
  backHome: "Quay về trang chủ",
  title: "Hồ sơ",
  subtitle: "Chỉnh sửa gọn gàng — ảnh đại diện và thông tin liên hệ của bạn.",
  body: "Lưu thay đổi để cập nhật tài khoản trên hệ thống.",
  sectionDetails: "Thông tin tài khoản",
  sectionOptional: "Liên hệ thêm",
  additionalContact: "Liên hệ bổ sung",
  email: "Email",
  name: "Họ tên",
  phone: "Điện thoại",
  age: "Tuổi",
  gender: "Giới tính",
  changePhoto: "Tải ảnh lên",
  avatarUrlHint: "Dán URL ảnh (https://…)",
  genderMale: "Nam",
  genderFemale: "Nữ",
  genderOther: "Khác",
  genderUnspecified: "Không nêu",
  save: "Lưu",
  saving: "Đang lưu…",
  saved: "Đã lưu",
  reset: "Hoàn tác",
  loading: "Đang tải…",
  retry: "Thử lại",
  logout: "Đăng xuất",
  needLogin: "Đăng nhập để xem hồ sơ.",
  goLogin: "Đăng nhập",
  imageTooBig: "Ảnh quá lớn (tối đa ~500KB).",
  imageType: "Chọn file ảnh.",
  dataUrlTooLong: "Ảnh mã hoá quá lớn.",
  previewHint: "Ảnh hiển thị trên tài khoản của bạn.",
  changeAvatarShort: "Đổi ảnh",
  optionalFieldHint: "Không bắt buộc.",
  messengerExampleHint: "Ví dụ Zalo, Telegram.",
  fullNameTooLong: "Họ tên tối đa 100 ký tự.",
  phoneTooLong: "Số điện thoại tối đa 20 ký tự.",
  ageInvalid: "Tuổi phải là số nguyên từ 0 đến 120.",
  genderTooLong: "Giới tính tối đa 20 ký tự.",
  additionalContactTooLong: "Liên hệ bổ sung tối đa 255 ký tự.",
};

const en: ProfileMessages = {
  backHome: "Back to home",
  title: "Profile",
  subtitle: "A calm place to refine your photo and contact details.",
  body: "Save to update your account on our systems.",
  sectionDetails: "Account details",
  sectionOptional: "Extra contact",
  additionalContact: "Additional contact",
  email: "Email",
  name: "Full name",
  phone: "Phone",
  age: "Age",
  gender: "Gender",
  changePhoto: "Upload image",
  avatarUrlHint: "Or paste image URL (https://…)",
  genderMale: "Male",
  genderFemale: "Female",
  genderOther: "Other",
  genderUnspecified: "Prefer not to say",
  save: "Save",
  saving: "Saving…",
  saved: "Saved",
  reset: "Reset",
  loading: "Loading…",
  retry: "Try again",
  logout: "Log out",
  needLogin: "Sign in to view your profile.",
  goLogin: "Sign in",
  imageTooBig: "Image too large (max ~500KB).",
  imageType: "Please pick an image file.",
  dataUrlTooLong: "Encoded image too large.",
  previewHint: "Shown on your account.",
  changeAvatarShort: "Change photo",
  optionalFieldHint: "Optional.",
  messengerExampleHint: "e.g. Zalo, Telegram.",
  fullNameTooLong: "Full name must be at most 100 characters.",
  phoneTooLong: "Phone must be at most 20 characters.",
  ageInvalid: "Age must be an integer between 0 and 120.",
  genderTooLong: "Gender must be at most 20 characters.",
  additionalContactTooLong: "Additional contact must be at most 255 characters.",
};

export const profileMessages: Record<AppLanguage, ProfileMessages> = { vi, en };
