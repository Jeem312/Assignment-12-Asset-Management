import { useForm } from "react-hook-form";

const AddAsset = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = async(data) => {
        console.log(data);
       
    }
   
    return (
        <div>
            
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex space-x-6 '>
                        <div>
                            <label
                                className="form-control w-full my-6">
                                <div className="label">
                                    <span className="label-text">Recipe Names</span>

                                </div>
                                <input
                                    {...register("name",{required:true})}
                                    type="text" placeholder="Recipe Name" className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div>
                            <label
                                className="form-control w-full my-6">
                                <div className="label">
                                    <span className="label-text">Price</span>

                                </div>
                                <input
                                    {...register("price",{required:true})}
                                    type="text" placeholder="Recipe Name" className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>
                    <select  {...register("category",{required:true})}
                        className="select select-bordered w-full ">
                        <option disabled selected>Select a categoory</option>
                        <option value="salad">Salad</option>
                        <option value="soup">Soup</option>
                        <option value="pizza">pizza</option>
                        <option value="drinks">Drinks</option>
                        <option value="deserts">Desertes</option>

                    </select>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                           
                        </div>
                        <textarea  {...register("recipe",{required:true})}
                        className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                       
                    </label>
                    <input
                      {...register("image",{required:true})} type="file" className="file-input file-input-bordered w-full  my-6" />
                     <button className='btn' >
                        Add Asset
                    </button>
                </form>
              
            </div>
        </div>
    );
};

export default AddAsset;