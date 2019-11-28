const useFirestoreQuery = (query: any) => {
  
	const [docState, setDocState] = useState<any>({
		isLoading: true, // default เป็น true นำไปใส่ loader ให้ขึ้น loading ตอนเปิด component ได้
		data: null,
		error: null
	});
  
  //ประกาศ useState ไว้ด้านบนเพื่อไว้เก็บค่าที่มาจาก onSnapshot ใน useEffect
  
  useEffect(() => {
    
    /*  query คือ firestore.collection(collectionName).doc(docName) */

     const unsub = query.onSnapshot(
				(snapshot: any) => { // ส่วนที่รับ response Data
                  
					const arr: any[] = []; // สร้าง Array เปล่าไว้
                  
					snapshot.forEach((doc: any) => {
                      
						arr.push({ docId: doc.id, ...doc.data() });
                      
           //เก็บข้อมูลลง Array เปล่าไว้ โดยแนบ document id 
					});
          //เมื่อข้อมูลมาถึงก็ทำการเก็บข้อมูลไปที่ state ที่เราส้รางไว้
					setDocState({
						isLoading: false, // ปิด loader เมื่อได้รับข้อมูล
						data: [...arr]
					});
                  
				},
				(err: any) => { // ส่วนที่รับ Error
                  
          //หรือเมื่อมีข้อผิดพลาดเกิดขึ้นจะเก็บ error ไปใน state แทน
                  
					setDocState({
						isLoading: false,
						error: err
					});
				}
			);
    
    		return () => { //clean up
              
              unsub(); //unsubscribe
    
    		}
        }
	}, []);

  	// return state ที่ได้ 
	return docState;
};
