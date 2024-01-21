import './App.css'
import {useEffect, useRef, useState} from "react";
import product1 from "./assets/images/product-1.jpg";
import product2 from "./assets/images/product-2.jpg";
import product3 from "./assets/images/product-3.jpg";
import product4 from "./assets/images/product-4.jpg";
import product5 from "./assets/images/product-5.jpg";
import product6 from "./assets/images/product-6.jpg";
import product7 from "./assets/images/product-7.jpg";
import product8 from "./assets/images/product-8.jpg";
import {convertTimerToHMS, shuffle} from "./helper.ts";
import "animate.css";
import {data} from "./data.ts";
import {MOVEMENT, TIMER} from "./environment.ts";

interface dataType {
    item: string,
    imageUrl: string
}

function App() {
    const [movement, setMovement] = useState(MOVEMENT);
    const [timer, setTimer] = useState(TIMER);
    const [startGame, setStartGame] = useState<boolean | undefined>(undefined);
    const [selectedItem, setSelectedItem] = useState<string[]>([])
    const [temporarySelect, setTemporarySelect] = useState<dataType[]>([])
    const itemPicture = [product1, product2, product3, product4, product5, product6, product7, product8]
    const idInterval = useRef<any>(null);
    const [dataSet, setDataSet] = useState<dataType[]>(data);


    useEffect(() => {
        if (startGame) {
            idInterval.current = setInterval(() => {
                setTimer(prevState => prevState - 1)
            }, 1000)
        }
        return () => clearInterval(idInterval.current)
    }, [startGame])

    useEffect(() => {
        if (timer < 0) clearInterval(idInterval.current)
    }, [timer]);

    useEffect(() => {
        setDataSet(handleGenerateData());
    }, []);

    useEffect(() => {
        if (timer < 0 || movement === 0) {
            if (selectedItem.length === 16) alert("you win ....")
            else alert("lose....");
            resetGame();
        }
    }, [movement, timer])

    const handleGenerateData = () => {
        const pictureItem: string[] = shuffle(itemPicture.concat(itemPicture))
        const generatedShuffledData: dataType[] = dataSet.map((item, index: number) => {
            return {
                item: item.item,
                imageUrl: pictureItem[index]
            }
        })
        return generatedShuffledData;
    }
    const resetGame = () => {
        setTimer(TIMER);
        setMovement(MOVEMENT);
        setStartGame(false);
        setTemporarySelect([])
        setSelectedItem([]);
    }

    const handleOnClickQuestion = (item: dataType) => {
        if (temporarySelect.length <= 1) {
            setStartGame(true);
            setMovement(prevState => prevState - 1)
            setTemporarySelect([...temporarySelect, item])
            if (temporarySelect.length === 1 && item.imageUrl === temporarySelect[0].imageUrl) setSelectedItem([...selectedItem, item.item, temporarySelect[0].item])
            if (temporarySelect.length === 1) {
                setTimeout(() => {
                    setTemporarySelect([])
                }, 1000)
            }
        }
    }

    return (
        <>
            <div className="text-lg mb-5 font-bold">
                {"به مسابقه بزرگ باسلام خوش آمدید."}
            </div>


            <div className="fixed right-24 bottom-40 rounded-full bg-amber-950 w-10 h-10 z-10"/>
            <div className="fixed right-24 bottom-40 bg-yellow-300 w-10 h-10 z-2"/>
            <div className="fixed right-24 bottom-40 bg-yellow-300 w-10 h-10 z-2 rotate-45"/>
            <div className="fixed right-[110px] bottom-0 bg-green-800 z-1 w-1 h-40"/>
            <div className="fixed rounded-full w-64 h-64 -bottom-40 right-0 z-10 bg-green-300"/>
            <div className="fixed border border-t-blue-100 w-full h-24 -bottom-20 right-8 z-[2] bg-blue-400 animate-bounce delay-1000" />
            <div className="fixed border w-full h-28 -bottom-28 right-8 z-[2] bg-blue-400 animate-bounce delay-1500" />


            <div className="flex flex-col gap-2 w-[500px] h-[500px]">
                <div className="flex text-md items-center justify-between">
                    <div className={"flex items-center gap-2"}>
                        <div>زمان</div>
                        <div
                            dir={"ltr"}
                            className={`font-bold ${timer < 10 && timer > 0 ? "text-red-600 animate-ping" : ""}`}>{convertTimerToHMS(timer)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>تعداد حرکت</div>
                        <div className="font-bold">{movement}</div>
                    </div>
                </div>
                <div
                    className="grid grid-cols-4 w-full self-center gap-2 mb-2 rounded-md bg-blue-100 border-2 border-blue-500 p-5">
                    {
                        dataSet.map((item, index) => {
                            return (
                                <div onClick={() => handleOnClickQuestion(item)} key={index}
                                     className="flex border dela border-red-500 drop-shadow-2xl justify-center self-center cursor-pointer items-center w-[100px] h-[100px] bg-orange-100 rounded-md">
                                    {
                                        !(selectedItem.includes(item.item) || temporarySelect.includes(item)) ? item.item :
                                            <img
                                                className="animate__animated animate__flipInY animate__delay-0.5s w-fit rounded-md"
                                                alt={item.item} src={item.imageUrl}/>
                                    }
                                </div>
                            )
                        })
                    }
                </div>

                {startGame === false && (
                    <div
                        className="rounded-md p-2 self-end drop-shadow-2xl border border-amber-950 text-md font-bold bg-red-100 w-40 h-10 cursor-pointer"
                        onClick={() => setStartGame(true)}>
                        {"شروع دوباره"}
                    </div>)}
            </div>
        </>
    )
}

export default App
