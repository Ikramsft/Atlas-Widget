import cookie from "cookie";
import Promise from "promise";
export default async function useCookies(req, res) {
  const promises = Object.keys(req.body).map(async (index) => {
    return cookie.serialize(index, req.body[index], {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });
  });
  // Object.keys(req.body).map((index) => {
  res.setHeader("Set-Cookie", await Promise.all(promises));
  // })
  res.statusCode = 200;
  res.json({ success: true });
}
