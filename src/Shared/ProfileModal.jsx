import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { RiBluetoothConnectLine } from "react-icons/ri";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import useUser from "../Hooks/useUser";


const ProfileModal = () => {
    const image_hosting_key = import.meta.env.VITE_IMAGE_API;
    // console.log(image_hosting_key);
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosPublic = useAxiosPublic()
    
 const{user} =useContext(AuthContext);
  const [users,refetch]=useUser();

    const {
        register,
   
        formState: { errors },
        handleSubmit,} = useForm();
        const onSubmit = async(data) => {console.log(data);
            const {name}=data;
            
          
      //       const imageFile = { image: data.image[0]};
      //       const res =await  axiosPublic.post(image_hosting_api,imageFile,{
      //           headers: {
      //               'Content-Type': 'multipart/form-data'
      //             }
               
      //       }    
            
      //  )   
          const updatedInfo = {
            name:name,
            // Company_logo:res.data.data.display_url,

          }
         axiosPublic.patch(`/updateProfile/${user?.email}`,updatedInfo)
         .then(res=>{
          refetch();
          console.log(res.data)
          if(res.data.modifiedCount>0){
            Swal.fire({
                title: 'success',
                text: 'Your Profile Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Success'
              
              
            })
            }
          
         })
            
 } 
       

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn mt-4 rounded-lg bg-green-400 text-white" onClick={()=>document.getElementById('my_modal_5').showModal()}>Update</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="flex  justify-center items-center text-2xl text-green-600">Update Your Name & image</h3>
    <form  onSubmit={handleSubmit(onSubmit)}>
    <div className="my-2">
    <input type="text" name="name" placeholder="Name" className="input input-bordered input-success w-full max-w-xs my-4" required  {...register("name", { required: true })} />
                   {errors.name && <span className='text-red-400'>This field is required</span>}
    {/* <input type="file" name="image" className="file-input file-input-bordered file-input-success w-full max-w-xs"   {...register("image", { required: true })} />
                   {errors.password && <span className='text-red-400'>This field is required</span>} */}
    </div>
   <div className="">
  <button className="btn-sm rounded-lg bg-green-400 text-white ">Update</button>
   </div>
    </form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn-sm rounded-lg border border-green-400">Close</button>
      </form>
    </div>
    <Toaster></Toaster>
  </div>
</dialog>
        </div>
    );
};

export default ProfileModal;