import React, { useEffect, useRef, useState } from "react";
import Icons from "../Common/Icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { useRouter } from "next/navigation";

const genAI = new GoogleGenerativeAI("AIzaSyCWoGfvkQq8lsNPWQYeTuYDDzRN2x4AVOs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface msgBody {
    email: string;
    userResponse: string;
    aiResponse: string;
}

interface Product {
    email: string;
    _id: string;
    category: string;
    productName: string;
    quantityLabel: string;
    price: number;
    image: string | undefined;
    rating: number;
    location: string;
    description: string;
    manuf_date: string;
    expd_date: string;
    shopName: string;
}

const AIChatBot = () => {
    const [state, setState] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);
    const [aiResponse, setAIResponse] = useState<string[]>([]);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [fullmessage, setFullMessage] = useState<msgBody[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [action, setAction] = useState<boolean>(false);

    const navigate = useRouter();

    const scrollRef = useRef<HTMLDivElement>(null);
    const outsideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                outsideRef.current &&
                !outsideRef.current.contains(event.target as Node)
            ) {
                setState(false);
            } else {
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [fullmessage, state]);

    const email = "rnsrashmika078@gmail.com";
    const username = "Rashmika Siriwardhana";

    const website = {
        siteName: "Farmnest",
        description: "A platform for farmers to buy and sell products.",
        features: [
            "Marketplace for agricultural products",
            "Seller profiles",
            "Product listings with images and descriptions",
            "User reviews and ratings",
            "Secure payment options",
            "Order tracking",
            "Customer support",
        ],
        products: products,
        targetAudience: "Farmers, agricultural product buyers, and sellers",
    };

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:3000/api/auth/getallproducts`
                );
                if (res.status === 200) {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    setProducts(res.data.allProducts);
                    setLoading(false);
                }
            } catch (error) {
                
            }
        };

        getAllProducts();
    }, []);

    // useEffect(() => {
    //     // if (state) {
    //     const getAllMessage = async () => {
    //         try {
    //             const res = await axios.get(
    //                 `http://localhost:3000/api/auth/chatbot/getConversation/${email}`
    //             );
    //             if (res.status === 200) {
    //                 setFullMessage(res.data.getMessages);
    //             }
    //         } catch (error) {
    //             alert(`error while getting all message ${error}`);
    //         }
    //     };
    //     getAllMessage();
    //     // }
    // }, []);

    

    useEffect(() => {
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

        if (state) {
            const run = async () => {
                await delay(250);
                setAction(true);
            };
            run();
        } else {
            setAction(false);
        }
    }, [state]);
    return (
        <div className={`z-[9999] fixed right-10 bottom-10`} ref={outsideRef}>
            <div onClick={() => setState((prev) => !prev)}>
                <div
                    className={`transition-all ${
                        state ? "opacity-100" : "hover:opacity-100 opacity-50"
                    }`}
                >
                    <Icons name={"bot"} />
                </div>
            </div>
            <div
                className={`transition-all duration-300 transform   shadow-2xl ${
                    state ? "translate-x-0 " : "translate-x-150"
                } fixed right-15 h-[450px] w-[300px] sm:w-[350px] sm:h-[500px]  md:w-[350px] md:h-[500px] lg:w-[350px] lg:h-[500px]  xl:w-[450px] xl:h-[500px]  bottom-25 bg-white rounded-lg shadow-lg`}
            >
                <div className="relative h-full">
                    <div className="absolute bg-gray-900 top-0 p-2  w-full text-white font-type text-center">
                        <p className="text-xl">AI CHATBOT</p>
                        <p className="text-xs text-yellow-400">
                            Get help with smart Ai chatbot
                        </p>
                    </div>
                    {/* Chat Area starts here*/}

                    <div className="overflow-x-hidden absolute top-[60px] bottom-[70px] overflow-y-auto scrollbar-hidden  w-full p-5 text-white font-type text-center">
                        <div className="flex flex-col text-sm text-start ">
                            <div className="flex text-center place-items-center justify-center items-center">
                                {loading && (
                                    <div className="fixed  p-1 z-50 rounded-2xl text-black  -mt-2 bg-gray-200">
                                        Sending...
                                    </div>
                                )}
                            </div>
                            <div
                                className={`block my-5 -mt-5 transition-all duration-1000 ease-in-out transform 
                  ${action ? "-translate-y-0" : "-translate-y-40"}
                 items-start justify-start overflow-y-auto`}
                            >
                                <div className="my-2 flex flex-col justify-start items-start bg-gray-900 p-2 rounded-2xl place-items-start gap-2">
                                    <div className="flex gap-2 -mb-3">
                                        <Icons name={"bot_v2"} />
                                        <p>Agent</p>
                                    </div>
                                    <div className="pl-8 flex text-green-500">
                                        {
                                            "Hi there! Welcome to Farmnest, the platform connecting farmers to buy and sell agricultural products. How can I help you today?"
                                        }
                                    </div>
                                </div>
                            </div>

                            {fullmessage && fullmessage.length > 0
                                ? fullmessage.map((msg, i) => (
                                      // eslint-disable-next-line react/jsx-key
                                      <div className="">
                                          <div className="flex justify-end items-center place-items-end">
                                              <div className="my-2 flex flex-col justify-start items-start bg-[rgb(0,0,0)] text-white p-2 rounded-2xl place-items-start gap-2">
                                                  <div className="flex gap-2 -mb-3">
                                                      <Icons name={"user_v3"} />
                                                      <p>
                                                          Rashmika Siriwardhana
                                                      </p>
                                                  </div>
                                                  <div className="pl-9 flex text-amber-500 font-type">
                                                      {msg.userResponse}
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="flex justify-start items-center place-items-start">
                                              <div className="my-2 flex flex-col justify-start items-start bg-gray-900 p-2 rounded-2xl place-items-start gap-2 ">
                                                  <div className="flex gap-2">
                                                      <Icons name={"bot_v2"} />
                                                      <p>Agent</p>
                                                  </div>
                                                  {msg.aiResponse.includes("/")
                                                      ? msg.aiResponse
                                                            .split("/")[0]
                                                            .split("*")
                                                      : null}
                                                  {msg.aiResponse.includes(
                                                      "/"
                                                  ) ? (
                                                      msg.aiResponse
                                                          .split("/")[1]
                                                          .split("*")
                                                          .map((item, index) =>
                                                              index ===
                                                              0 ? null : (
                                                                  <div
                                                                      key={
                                                                          index
                                                                      }
                                                                      ref={
                                                                          scrollRef
                                                                      }
                                                                      className="pl-4 flex flex-col text-green-500 -mt-1"
                                                                  >
                                                                      <div className="flex flex-row gap-2">
                                                                          •
                                                                          <div>
                                                                              {item.includes(
                                                                                  "ID"
                                                                              ) ? (
                                                                                  <div className="flex flex-row gap-2">
                                                                                      <div>
                                                                                          {
                                                                                              item
                                                                                                  .trim()
                                                                                                  .split(
                                                                                                      "(ID:"
                                                                                                  )[0]
                                                                                          }
                                                                                      </div>
                                                                                      <button
                                                                                          className="text-black hover:underline font-type bg-blue-500 px-2"
                                                                                          onClick={() =>
                                                                                              navigate(
                                                                                                  `/product/${item
                                                                                                      .trim()
                                                                                                      .split(
                                                                                                          "(ID:"
                                                                                                      )[1]
                                                                                                      .split(
                                                                                                          ")"
                                                                                                      )[0]
                                                                                                      .slice(
                                                                                                          0,
                                                                                                          item
                                                                                                              .trim()
                                                                                                              .split(
                                                                                                                  "(ID:"
                                                                                                              )[1]
                                                                                                              .length -
                                                                                                              1
                                                                                                      )
                                                                                                      .trim()}`
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          View
                                                                                      </button>
                                                                                  </div>
                                                                              ) : (
                                                                                  item.trim()
                                                                              )}
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              )
                                                          )
                                                  ) : (
                                                      <div
                                                          ref={scrollRef}
                                                          className="-mt-2 pl-8 flex flex-col  text-green-500"
                                                      >
                                                          {msg.aiResponse}
                                                      </div>
                                                  )}
                                              </div>
                                          </div>
                                      </div>
                                  ))
                                : null}
                        </div>

                        <div className="flex flex-col justify-end items-end text-sm text-start"></div>
                    </div>
                    {/* Chat Area  ends here*/}
                    <div className="absolute bg-gray-900 p-5 bottom-0  w-full text-white font-type text-center">
                        <div className="flex items-center justify-between gap-2">
                            <input
                                type="text"
                                name="message"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                placeholder="Enter Your Message..."
                                className="pl-4 bg-gray-100 text-black p-1 rounded-2xl w-full"
                            ></input>
                            <button
                                disabled={loading ? true : false}
                                onClick={generateContent}
                            >
                                <Icons name={"send"} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatBot;
