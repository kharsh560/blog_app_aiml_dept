import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const useAllPostData = ()=>{
    const [AllPostData,setAllPostData] = useState(null);
    const navigate = useNavigate()
    
    async function getAllPostData() {
        const response = await fetch(
          `${process.env.BASE_URL}/api/v1/post/getAllPosts`
        );
        // console.log(response.json());
        const json = await response.json();
        setAllPostData(json?.data);
        // console.log(json);
        
        // if (response) {
        //     const json = await JSON.parse(response.data);
        //     setAllPostData(json);
        // }
        // else {
        //     console.log("NULL",response);
        // }
    }

    useEffect(() => {
      getAllPostData();
    }, [navigate]);

    return AllPostData;
}

export default useAllPostData;