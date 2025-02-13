import { useEffect, useState } from "react"
import { useSelector } from "react-redux";


const usePostDetail = (id) =>{
    console.log("satya" + id);
    const [userid, setUserId] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    console.log("userData._id in usePostDetail:  ", userData?._id);
    
    const[postDetail,setpostDetail] = useState(null);
    async function getPostDetail(){
        const response = await fetch(
          `http://64.227.140.158:4800/api/v1/post/getPost/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Required for cookies in cross-origin requests
            body: JSON.stringify({
              _id: userData?._id,
            }),
          }
        );
        // console.log(response);
        const json = await response.json();
        setpostDetail(json);
    }

    useEffect(() => {
      setUserId(userData?._id);
      getPostDetail();
    }, [userData]);
    return postDetail;
}

export default usePostDetail;