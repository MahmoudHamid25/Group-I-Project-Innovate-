import {Footer, NavBar} from "@/app/page";
import UploadPrompt from "@/app/uploading/uploadPrompt";



export default function Uploading(){
    return(
        <body>
            <NavBar/>
            <main>
                <UploadPrompt/>
            </main>
            <Footer/>
        </body>
    );
}