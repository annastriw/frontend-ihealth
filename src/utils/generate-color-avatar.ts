const avatarColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
];

export function getAvatarColor(id: string) {
  const index = id.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}
