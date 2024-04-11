import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout";
import { getError } from "../../../utils/error";
import { CldImage } from "next-cloudinary";
import { customParams } from "../../../components/ProductItem";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return { ...state, loadingUpload: false, errorUpload: "" };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
}

export default function AdminProductEditScreen() {
  const [imagesArray, setImagesArray] = useState([]);
  const [subCategoriesArr, setSubCategoriesArr] = useState([]);
  const [keywordsArr, setKeywordsArr] = useState([]);
  const [coloursArr, setColoursArr] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [productFeatured, setProductFeatured] = useState(false);
  const { query } = useRouter();
  const router = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("slug", data.slug);
        setValue("price", data.price);
        setValue("countInStock", data.countInStock);
        setValue("image", data.image);
        setValue("images", data.images);
        setValue("featuredImage", data.featuredImage);
        setValue("colours", data.colours);
        setValue("category", data.category);
        setValue("subcategories", data.subcategories);
        setValue("keywords", data.keywords);
        setValue("brand", data.brand);
        setValue("designer", data.designer);
        setValue("description", data.description);
        setValue("details", data.details);
        setValue("isFeatured", data.isFeatured);
        if (data.colours.length > 0) setColoursArr(data.colours);
        if (data.images.length > 0) setImagesArray(data.images);
        if (data.featuredImage.length > 0) setSelectedImage(data.featuredImage);
        if (data.keywords.length > 0) setKeywordsArr(data.keywords);
        if (data.subcategories.length > 0)
          setSubCategoriesArr(data.subcategories);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (imagesArray.length === 0) {
      fetchData();
    }
  }, [productId, setValue, imagesArray.length]);

  const test = () => {
    if (
      !window.confirm(
        ` Product Information
        name: ${getValues("name")} 
        slug: ${getValues("slug")} 
        isFeatured: ${getValues("isFeatured")} 
        price: ${getValues("price")} 
        countInStock: ${getValues("countInStock")} 
        image: ${getValues("image")} 
        images: ${getValues("images")} 
        featuredImage: ${getValues("featuredImage")} 
        colours: ${getValues("colours")} 
        category: ${getValues("category")} 
        subcategories: ${getValues("subcategories")} 
        keywords: ${getValues("keywords")} 
        brand: ${getValues("brand")} 
        designer: ${getValues("designer")} 
        details: ${getValues("details")} 
        description: ${getValues("description")}     
    `
      )
    ) {
      return;
    }
  };

  const uploadHandler = async (e) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const {
        data: { signature, timestamp },
      } = await axios(`/api/admin/cloudinary-sign`);

      const file = e.target.files[0];

      const formData = new FormData();

      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

      const { data } = await axios.post(url, formData);

      dispatch({ type: "UPLOAD_SUCCESS" });

      setValue("image", data.secure_url);
      setValue("images", [...imagesArray, data.secure_url]);
      setValue("featuredImage", data.secure_url);
      setImagesArray([...imagesArray, data.secure_url]);
      if (!selectedImage) setSelectedImage(data.secure_url);
      toast.success("Your file has been uploaded successfully");
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const addSubCat = () => {
    const newValue = document.getElementById("addsubcategories").value;
    if (subCategoriesArr.includes(newValue)) {
      document.getElementById("addsubcategories").value = "";
      let err = { message: "Category already used" };
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
      return;
    } else if (newValue.length === 0) {
      document.getElementById("addsubcategories").value = "";
      let err = { message: "You need to input text" };
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
      return;
    }
    setSubCategoriesArr([...subCategoriesArr, newValue]);
    setValue("subcategories", [...subCategoriesArr, newValue]);
    document.getElementById("addsubcategories").value = "";
  };

  const addColour = () => {
    const newValue = document.getElementById("addcolours").value;
    if (coloursArr.includes(newValue)) {
      document.getElementById("addcolours").value = "";
      let err = { message: "Colour already added" };
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
      return;
    } else if (newValue.length === 0) {
      document.getElementById("addcolours").value = "";
      let err = { message: "You need to input text" };
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
      return;
    }
    setColoursArr([...coloursArr, newValue]);
    setValue("colours", [...coloursArr, newValue]);
    document.getElementById("addcolours").value = "";
  };

  const addKeyword = () => {
    const newValue = document.getElementById("addkeywords").value;
    if (keywordsArr.includes(newValue)) {
      document.getElementById("addkeywords").value = "";
      let err = { message: "Keyword already used" };
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
      return;
    }
    setKeywordsArr([...keywordsArr, newValue]);
    setValue("keywords", [...keywordsArr, newValue]);
    document.getElementById("addkeywords").value = "";
  };

  const removeSubCat = (remove) => {
    const result = subCategoriesArr.filter((subCat) => {
      return subCat !== remove;
    });
    setValue("subcategories", result);
    setSubCategoriesArr(result);
  };

  const removeColour = (remove) => {
    const result = coloursArr.filter((colour) => {
      return colour !== remove;
    });
    setValue("colours", result);
    setColoursArr(result);
  };

  const removeKeyword = (remove) => {
    const result = keywordsArr.filter((keys) => {
      return keys !== remove;
    });
    setValue("keywords", result);
    setKeywordsArr(result);
  };

  const generateSlug = () => {
    const nameInput = document.getElementById("name");
    const slugInput = document.getElementById("slug");
    const slug = slugify(nameInput.value);
    slugInput.value = slug;
    setValue("slug", slug);
  };

  const slugify = (string) => {
    const slug = string
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-/, "")
      .replace(/-$/, "");
    return slug;
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    subcategories,
    image,
    images,
    featuredImage,
    colours,
    brand,
    designer,
    countInStock,
    description,
    details,
    keywords,
    isFeatured,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        subcategories,
        image,
        images,
        featuredImage,
        colours,
        brand,
        countInStock,
        designer,
        description,
        details,
        keywords,
        isFeatured,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully");
      router.push(`/admin/products/${productId}}`);
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products" className="font-bold">
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading content...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <section>
              <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
              >
                <h1 className="my-4 font-bold text-xl">{`Edit Product ${productId}`}</h1>

                <div className="mb-4">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    className="w-full"
                    id="name"
                    autoFocus
                    {...register("name", {
                      required: "Please enter product name",
                    })}
                  />
                  <button
                    className="thirdary-button mt-4 text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      generateSlug();
                    }}
                  >
                    Convert to Slug
                  </button>
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="slug">Slug</label>
                  <input
                    type="text"
                    className="w-full"
                    id="slug"
                    readOnly
                    {...register("slug", {
                      required: "Please enter product slug",
                    })}
                  />
                  {errors.slug && (
                    <div className="text-red-500">{errors.slug.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="price">Product Price</label>
                  <input
                    type="text"
                    className="w-full"
                    id="price"
                    {...register("price", {
                      required: "Please enter product price",
                    })}
                  />
                  {errors.price && (
                    <div className="text-red-500">{errors.price.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="countInStock">Product Stock Count</label>
                  <input
                    type="text"
                    className="w-full"
                    id="countInStock"
                    {...register("countInStock", {
                      required: "Please enter product stock count",
                    })}
                  />
                  {errors.countInStock && (
                    <div className="text-red-500">
                      {errors.countInStock.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="category">Product Category</label>
                  <select
                    name="category"
                    id="category-selector"
                    className="w-full"
                    {...register("category", {
                      required: "Please select product category",
                    })}
                  >
                    <option id="category" value="Accessories">
                      Accessories
                    </option>
                    <option id="category" value="Knit Kits">
                      Knit Kits
                    </option>
                    <option id="category" value="Magazines">
                      Magazines
                    </option>
                    <option id="category" value="Yarns">
                      Yarns
                    </option>
                  </select>
                  {errors.category && (
                    <div className="text-red-500">
                      {errors.category.message}
                    </div>
                  )}
                </div>

                <div className="mb-4 border p-2">
                  <div className="mt-2">
                    <label htmlFor="addcategories">
                      Product Sub-Categories
                    </label>
                    {subCategoriesArr.length > 0 && (
                      <div className="pt-1 pb-2 px-2">
                        <div className="flex flex-row pt-1 space-x-2 ">
                          {subCategoriesArr.map((sub, i) => {
                            return (
                              <div
                                key={i}
                                className="group cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeSubCat(sub);
                                }}
                              >
                                <p className="relative left-0 top-0 right-0 bottom-0 border bg-gray-200 py-2 px-4 rounded-lg group-hover:bg-gray-400 group-hover:text-white">
                                  {sub}{" "}
                                  <span className="text-sm text-black/10 absolute top-[-3px] right-[5px] group-hover:text-white">
                                    x
                                  </span>
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <hr className="w-full mt-2 pb-4 drop-shadow-md" />
                  <div className="grid grid-cols-3 mx-auto gap-2">
                    <div className="col-span-2">
                      <input
                        type="text"
                        className="w-full"
                        id="addsubcategories"
                      />
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addSubCat();
                        }}
                        className="primary-button"
                      >
                        Add Sub Category
                      </button>
                    </div>
                  </div>

                  {errors.subcategories && (
                    <div className="text-red-500">
                      {errors.subcategories.message}
                    </div>
                  )}
                </div>

                <div className="mb-4 border p-2">
                  <div className="mt-2">
                    <label htmlFor="addcategories">Product Colours</label>
                    {coloursArr.length > 0 && (
                      <div className="pt-1 pb-2">
                        <div className="flex flex-row flex-wrap ">
                          {coloursArr.map((col, i) => {
                            return (
                              <div
                                key={i}
                                className="group cursor-pointer m-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeColour(col);
                                }}
                              >
                                <p className="relative left-0 top-0 right-0 bottom-0 border bg-gray-200 py-2 px-4 rounded-lg group-hover:bg-gray-400 group-hover:text-white">
                                  {col}{" "}
                                  <span className="text-sm text-black/10 absolute top-[-3px] right-[5px] group-hover:text-white">
                                    x
                                  </span>
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <hr className="w-full mt-2 pb-4 drop-shadow-md" />

                  <div className="grid grid-cols-3 mx-auto gap-2">
                    <div className="col-span-2">
                      <input type="text" className="w-full" id="addcolours" />
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addColour();
                        }}
                        className="primary-button"
                      >
                        Add Colour
                      </button>
                    </div>
                  </div>

                  {errors.colours && (
                    <div className="text-red-500">{errors.colours.message}</div>
                  )}
                </div>

                <div className="mb-4 border p-2">
                  <label htmlFor="addkeywords">Product Keywords</label>
                  {keywordsArr.length > 0 && (
                    <div className="pt-1 pb-2">
                      <div className="flex flex-row flex-wrap">
                        {keywordsArr.map((key, i) => {
                          return (
                            <div
                              key={i}
                              className="group cursor-pointer m-1"
                              onClick={(e) => {
                                e.preventDefault();
                                removeKeyword(key);
                              }}
                            >
                              <p className="relative left-0 top-0 right-0 bottom-0 border bg-gray-200 py-2 px-4 rounded-lg group-hover:bg-gray-400 group-hover:text-white">
                                {key}
                                <span className="text-sm text-black/10 absolute top-[-3px] right-[5px] group-hover:text-white">
                                  x
                                </span>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <hr className="w-full mt-2 pb-4 drop-shadow-md" />

                  <div className="grid grid-cols-3 mx-auto gap-2">
                    <div className="col-span-2">
                      <input type="text" className="w-full" id="addkeywords" />
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addKeyword();
                        }}
                        className="primary-button"
                      >
                        Add Keyword
                      </button>
                    </div>
                  </div>

                  {errors.keywords && (
                    <div className="text-red-500">
                      {errors.keywords.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="image">Product Images</label>
                  <div className="flex flex-row flex-wrap gap-4 mt-4">
                    {selectedImage.length > 0 && (
                      <div className="">
                        <CldImage
                          src={selectedImage}
                          width={customParams.width}
                          height={customParams.height}
                          sizes="100w"
                          alt="/"
                          fetchpriority={"high"}
                          {...customParams}
                          className="rounded shadow-lg object-cover h-32 w-32  border-4 border-green-700/70 cursor-pointer drop-shadow-md"
                        />
                        <p className="mt-2 py-2 px-1 text-sm text-center font-semibold text-green-900 bg-green-200 rounded-lg">
                          Featured Image
                        </p>
                      </div>
                    )}
                    {imagesArray.length > 1 ? (
                      imagesArray
                        .filter((img) => {
                          return img !== selectedImage;
                        })
                        .map((img, i) => {
                          return (
                            <div key={i}>
                              <CldImage
                                src={img}
                                width={customParams.width}
                                height={customParams.height}
                                sizes="100w"
                                alt="/"
                                fetchpriority={"high"}
                                {...customParams}
                                className="rounded shadow-lg object-cover h-32 w-32 border cursor-pointer drop-shadow-md"
                              />
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setValue("featuredImage", img);
                                  setSelectedImage(img);
                                  toast.success(
                                    "You have changed the featured image"
                                  );
                                }}
                                className="mt-2 py-2 w-full text-sm text-center font-semibold text-amber-800 bg-amber-200 rounded-lg hover:bg-amber-200/50 hover:text-amber-600"
                              >
                                Set Featured
                              </button>
                            </div>
                          );
                        })
                    ) : (
                      <div>
                        <div className="h-32 w-32 border flex justify-center items-center drop-shadow-lg">
                          <div className=" h-20 w-20 border-4 rounded-full border-amber-300">
                            <div className="w-2 h-[75px] bg-amber-400 rotate-45 relative top-0 left-8"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                  {errors.images && (
                    <div className="text-red-500">{errors.images.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="imageFile">Upload Product Images</label>
                  <br />
                  <label htmlFor="imageFile" className="text-sm">
                    **Please upload one image at a time
                  </label>
                  <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={uploadHandler}
                  />
                  {errors.images && (
                    <div className="text-red-500">{errors.images.message}</div>
                  )}
                  {loadingUpload && (
                    <div className="mt-2 border-2 rounded border-green-500/50 pt-1 px-2 bg-green-600 drop-shadow-md">
                      <p className="text-white">
                        Uploading image - please wait...
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="brand">Product Brand</label>
                  <select
                    name="brand"
                    id="brand-select"
                    className="w-full"
                    {...register("brand", {
                      required: "Please enter product brand",
                    })}
                  >
                    <option id="brand" value="AnaKnits">
                      AnaKnits
                    </option>
                    <option id="brand" value="Rosarios4">
                      Rosarios4
                    </option>
                    <option id="brand" value="Phildar">
                      Phildar
                    </option>
                  </select>
                  {errors.brand && (
                    <div className="text-red-500">{errors.brand.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="designer">Product Designer</label>
                  <input
                    type="text"
                    className="w-full"
                    id="designer"
                    {...register("designer")}
                  />
                  {errors.designer && (
                    <div className="text-red-500">
                      {errors.designer.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="description">Product Description</label>
                  <textarea
                    cols={60}
                    rows={5}
                    type="text"
                    className="w-full"
                    id="description"
                    {...register("description", {
                      required: "Please enter product description",
                    })}
                  />
                  {errors.description && (
                    <div className="text-red-500">
                      {errors.description.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="details">Product Details</label>
                  <textarea
                    cols={60}
                    rows={5}
                    type="text"
                    className="w-full"
                    id="details"
                    {...register("details")}
                  />
                  {errors.details && (
                    <div className="text-red-500">{errors.details.message}</div>
                  )}
                </div>

                <div className="py-2 mb-6 flex justify-left items-center">
                  <input
                    type="checkbox"
                    className="mr-2 mt-1 accent-green-400 h-6 w-6"
                    id="isfeatured"
                    onClick={() => {
                      console.log(productFeatured, "#######");
                      setValue("isFeatured", !productFeatured);
                      setProductFeatured(!productFeatured);
                    }}
                    {...register("isFeatured")}
                  />
                  <label htmlFor="isfeatured" className="text-lg">
                    Featured Product
                  </label>
                  {errors.isfeatured && (
                    <div className="text-red-500">
                      {errors.isfeatured.message}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="mb-4 w-full">
                    <button
                      disabled={loadingUpdate}
                      className="thirdary-button"
                    >
                      {loadingUpdate ? "Loading" : "Update"}
                    </button>
                  </div>
                  <div className="mb-4 w-full mx-4">
                    <button
                      className="primary-button text-white font-bold"
                      onClick={(e) => {
                        e.preventDefault();
                        test();
                      }}
                    >
                      Test
                    </button>
                  </div>
                  <div className="mb-4 w-full">
                    <Link href={`/admin/products`}>
                      <button className="secondary-button">Back</button>
                    </Link>
                  </div>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
AdminProductEditScreen.auth = { adminOnly: true };
