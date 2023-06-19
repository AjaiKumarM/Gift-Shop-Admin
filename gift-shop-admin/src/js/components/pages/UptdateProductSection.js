import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import {
  ClearToastShow,
  NavTogglerChangeMenu,
  ProductMenuChange,
  ToastSuccessShow,
} from "../../slice/Navbarslice";
import { useDispatch, useSelector } from "react-redux";
import { SingleProductAction, UpdateProductAction } from "../../Actions/ProductAction";
import { ClearProductSuccess } from "../../slice/ProductSlice";
import Loader from "../layouts/Loader";

export default function UpdateProductSection() {
  const { navToogle } = useSelector((state) => state.NavbarState);
  const { success, loading, singleProduct ,isLoading} = useSelector(
    (state) => state.ProductState
  );

  //New Product List
  const [name, SetName] = useState("");
  const [price, SetPrice] = useState();
  const [description, SetDiscription] = useState("");
  const [stock, SetStock] = useState();
  const [categorys, SetCategory] = useState("");
  const [seller, SetSeller] = useState("");
  const [images, SetImages] = useState([]);
  const [imagePreview, SetImagePreview] = useState([]);

  const [changeValue,SetChangeValue] = useState(true)

  const category = [
    "Accessories",
    "Cards",
    "Clothing",
    "Jewelries",
    "Handbages",
    "Office & Stationary",
    "Toys",
    "Wallets",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  //Setting Image Preview
  const OncChangeImagePreview = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          SetImagePreview((oldArray) => [...oldArray, reader.result]);
          SetImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const CreateProductFuction = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("stock", stock);
    formdata.append("category", categorys);
    formdata.append("seller", seller);
    dispatch(UpdateProductAction(id,formdata));
  };


  useEffect(()=>{
    dispatch(ProductMenuChange())
    dispatch(SingleProductAction(id))
  },[dispatch,id])

  useEffect(()=>{
    if(singleProduct._id && changeValue){
        SetName(singleProduct.name)
        SetPrice(singleProduct.price)
        SetDiscription(singleProduct.description)
        SetStock(singleProduct.stock)
        SetCategory(singleProduct.category)
        SetSeller(singleProduct.seller)

        let imagess =[]
        singleProduct.images.forEach((image)=>imagess.push(image.image))
        SetImagePreview(imagess)
        SetChangeValue(false)
    }
  },[singleProduct,changeValue])

  useEffect(() => {
    if (success) {
      dispatch(ToastSuccessShow("Product Updated SuccessFully"));
      setTimeout(() => dispatch(ClearToastShow()), 4000);
      setTimeout(() => dispatch(ClearProductSuccess()), 4000);
      navigate("/admin/products");
    }
  }, [success, dispatch,singleProduct,navigate]);

  return (
    <Fragment>
      <MetaData title={"Update Product"} />
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="d-sc-flex">
            <div className="left-gap"></div>
            <div className="right-content mt-5 mx-md-5 mx-lg-0 overflow-v h-100 mb-5">
              <div>
                <nav aria-label="breadcrumbs ">
                  <ol className="breadcrumb sc-bread-con mx-3 font-small">
                    <li className="breadcrumb-item sc-bread">Pages</li>
                    <li
                      className="breadcrumb-item sc-bread-link pointer"
                      onClick={() => navigate("/admin/products")}
                    >
                      Product
                    </li>
                    <li
                      className="breadcrumb-item active sc-bread-active"
                      aria-current="page"
                    >
                      Update Product
                    </li>
                  </ol>
                </nav>
                <div className="dashboarrd-head mx-3">
                  <h3 className="text-light ">Update Product</h3>
                  <div
                    onClick={() =>
                      navToogle
                        ? dispatch(NavTogglerChangeMenu(false))
                        : dispatch(NavTogglerChangeMenu(true))
                    }
                    className={`navbars-toggle d-flex d-lg-none ${
                      navToogle ? "active-tog" : ""
                    }`}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="sc-card mt-4 ms-3">
                  <div className="form-head py-2">
                    <h4 className="text-center text-blue fw-bold">
                      Update Product
                    </h4>
                  </div>
                  <form
                    action="post"
                    onSubmit={CreateProductFuction}
                    className="row px-3"
                  >
                    <div className="col-sm-6">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-sc-control"
                        value={name}
                        onChange={(e) => SetName(e.target.value)}
                        required
                        placeholder="Enter the Product Name"
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="price">Price</label>
                      <input
                        type="tel"
                        name="price"
                        id="price"
                        className="form-sc-control"
                        value={price}
                        onChange={(e) => SetPrice(e.target.value)}
                        required
                        placeholder="Enter the product price"
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        cols="30"
                        className="form-sc-control"
                        rows="5"
                        value={description}
                        onChange={(e) => SetDiscription(e.target.value)}
                        required
                        placeholder="Enter the product description"
                      ></textarea>
                    </div>
                    <div className="col-sm-6">
                      <div className="col-12">
                        <label htmlFor="stock">Stock</label>
                        <input
                          type="tel"
                          name="stock"
                          id="stock"
                          className="form-sc-control"
                          value={stock}
                          onChange={(e) => SetStock(e.target.value)}
                          required
                          placeholder="Enter the product stock"
                        />
                      </div>
                      <div className="col-12 mt-sm-3">
                        <label htmlFor="category">Category</label>
                        <select
                          name="category"
                          id="category"
                          className="form-sc-control pointer"
                          required
                          onChange={(e) => SetCategory(e.target.value)}
                          value={categorys}
                        >
                          <option value="">--Select Options--</option>
                          {category.map((cat) => (
                            <option value={cat} key={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="image">Image</label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="form-sc-control"
                        onChange={(e) => OncChangeImagePreview(e)}
                      />
                    </div>
                    <div className="col-sm-6 mt-sm-1">
                      <label htmlFor="seller">Seller</label>
                      <input
                        type="text"
                        name="seller"
                        id="seller"
                        className="form-sc-control"
                        value={seller}
                        onChange={(e) => SetSeller(e.target.value)}
                        required
                        placeholder="Enter the Seller Name"
                      />
                    </div>
                    <div className="col-12 d-flex gap-4">
                      {imagePreview.map((image, i) => (
                        <Fragment key={image}>
                          <div className="position-relative">
                            <div className="create-product-img">
                              <img src={image} alt={image} />
                            </div>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    <div className="col-12 my-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-sc-primary rounded-pill w-100 display-flex gap-3"
                      >
                        <span>Create</span>
                        {loading ? <span className="loader2"></span> : null}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
