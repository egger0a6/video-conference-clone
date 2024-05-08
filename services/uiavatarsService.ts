const BASE_URL = "https://ui-avatars.com/api/?";

const colors = ["35155D", "512B81", "4477CE", "1F6E8C", "2E8A99", "526D82"];

export const getRandomPlaceholderAvatar = async () => {
  let color = colors[Math.floor(Math.random()*colors.length)];

  try {
    const res = await fetch(
      `${BASE_URL}background=${color}&color=fff`,
      {
        method: "GET",
      }
    );
    const avatarUrl = await res.url;
    return avatarUrl;
  } catch (error) {
    console.log(error);
  }
}