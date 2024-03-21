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
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [imagesArray, setImagesArray] = useState([]);
  const [subCategoriesArr, setSubCategoriesArr] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [keywordsArr, setKeywordsArr] = useState([]);
  const [productFeatured, setProductFeatured] = useState(false);

  const test = () => {
    console.log("###########Here##########");
    console.log(getValues("name"), "name");
    console.log(getValues("slug"), "slug");
    console.log(getValues("price"), "price");
    console.log(getValues("countInStock"), "countInStock");
    console.log(getValues("image"), "image");
    console.log(getValues("images"), "images");
    console.log(getValues("featuredImage"), "featuredImage");
    console.log(getValues("category"), "category");
    console.log(getValues("subcategories"), "subcategories");
    console.log(getValues("keywords"), "keywords");
    console.log(getValues("brand"), "brand");
    console.log(getValues("designer"), "designer");
    console.log(getValues("description"), "description");
    console.log(getValues("isFeatured"), "isFeatured");
  };

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
        setValue("category", data.category);
        setValue("subcategories", data.subcategories);
        setValue("keywords", data.keywords);
        setValue("brand", data.brand);
        setValue("designer", data.designer);
        setValue("description", data.description);
        setValue("isFeatured", data.isFeatured);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (imagesArray.length === 0) {
      fetchData();
    }
  }, [productId, setValue, imagesArray.length]);

  const router = useRouter();

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
    brand,
    designer,
    countInStock,
    description,
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
        brand,
        designer,
        countInStock,
        description,
        keywords,
        isFeatured,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully");
      router.push(`/admin/products}`);
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
                <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
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
                                className="mt-2 py-2 w-full text-sm text-center font-semibold text-orange-800 bg-orange-200 rounded-lg hover:bg-orange-400 hover:text-orange-100"
                              >
                                Set Featured
                              </button>
                            </div>
                          );
                        })
                    ) : (
                      <div className="">
                        <div className="h-32 w-32 border flex justify-center items-center drop-shadow-lg">
                          <div className=" h-20 w-20 border-4 rounded-full border-orange-300">
                            <div className="w-2 h-[75px] bg-orange-300 rotate-45 relative top-0 left-8"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="imageFile">Upload Product Image</label>
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
                        Uploading image... please wait...
                      </p>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="category">Product Category</label>
                  <select
                    name="category"
                    id="category"
                    className="w-full"
                    {...register("category", {
                      required: "Please select product category",
                    })}
                  >
                    <option id="category" value="babyKnits">
                      Baby Knits
                    </option>
                    <option id="category" value="blanketsSocks">
                      Blankets &amp; Socks
                    </option>
                    <option id="category" value="kidKnits">
                      Kid Knits
                    </option>
                    <option id="category" value="knitkits">
                      Knit Kits
                    </option>
                    <option id="category" value="Patterns">
                      Patterns
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
                  <div className="grid grid-cols-3 mx-auto gap-2">
                    <div className="col-span-2">
                      <label htmlFor="addsubcategories">
                        Add Product Sub-Category
                      </label>
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
                        className="primary-button mt-6"
                      >
                        Add Sub Category
                      </button>
                    </div>
                  </div>

                  <hr className="w-full mt-4 drop-shadow-md" />

                  <div className="mt-2">
                    {subCategoriesArr.length > 0 && (
                      <div className="pt-1 pb-2 px-2">
                        <label htmlFor="addcategories">
                          Product Sub-Categories
                        </label>
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
                                <p className="relative left-0 top-0 right-0 bottom-0 border bg-gray-200 py-2 px-4 rounded-lg group-hover:bg-gray-400 group-hover:text-gray-100">
                                  {sub}{" "}
                                  <span className="text-sm text-black/10 absolute top-[-3px] right-[5px] group-hover:text-gray-50">
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

                  {errors.category && (
                    <div className="text-red-500">
                      {errors.category.message}
                    </div>
                  )}
                </div>
                <div className="mb-4 border p-2">
                  <div className="grid grid-cols-3 mx-auto gap-2">
                    <div className="col-span-2">
                      <label htmlFor="addkeywords">Add Keywords</label>
                      <input type="text" className="w-full" id="addkeywords" />
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addKeyword();
                        }}
                        className="primary-button mt-6"
                      >
                        Add Keyword
                      </button>
                    </div>
                  </div>

                  <hr className="w-full mt-4 drop-shadow-md" />

                  <div className="mt-2">
                    {keywordsArr.length > 0 && (
                      <div className="pt-1 pb-2 px-2">
                        <label htmlFor="addcategories">Product Keywords</label>
                        <div className="flex flex-row pt-1 space-x-2 ">
                          {keywordsArr.map((key, i) => {
                            return (
                              <div
                                key={i}
                                className="group cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeKeyword(key);
                                }}
                              >
                                <p className="relative left-0 top-0 right-0 bottom-0 border bg-gray-200 py-2 px-4 rounded-lg group-hover:bg-gray-400 group-hover:text-gray-100">
                                  {key}{" "}
                                  <span className="text-sm text-black/10 absolute top-[-3px] right-[5px] group-hover:text-gray-50">
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

                  {errors.keywords && (
                    <div className="text-red-500">
                      {errors.keywords.message}
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
                  <input type="text" className="w-full" id="designer" />
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

                <div className="py-2 mb-6 flex justify-left items-center">
                  <input
                    type="checkbox"
                    className="mr-4 mt-1"
                    id="isfeatured"
                    onClick={() => {
                      console.log(productFeatured, "#######");
                      setValue("isFeatured", !productFeatured);
                      setProductFeatured(!productFeatured);
                    }}
                  />
                  <label htmlFor="isfeatured">Featured Product</label>
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
                      <button className="secondary-button">
                        Back to Products
                      </button>
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
