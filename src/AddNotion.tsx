import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AddNotion = () => {
  const redirectUrl = `http://${window.location.hostname}:3000`;
  const clientId = "a9b9a490-36db-4ee3-ad93-91023c86ebd8";
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (!authCode) return;

    axios({
      method: "post",
      url: "https://api.notion.com/v1/oauth/token",
      data: {
        grant_type: "authorization_code",
        code: authCode,
      },
      headers: {
        // Authorization: `Basic ${encodedToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <a
      href={`https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${clientId}&redirect_uri=${encodeURI(
        redirectUrl
      )}&response_type=code`}
    >
      Add to Notion
    </a>
  );
};

export default AddNotion;
