const finalUser = require("../models/model")

module.exports.get_info = async (req, res) => {
  try {
    const [SkattResponse, FolkRegResponse, AARegResponse] = await Promise.allSettled([
    fetch(`http://localhost:${process.env.PORT_SKATT}/user/${req.params.id}`),
    fetch(`http://localhost:${process.env.PORT_FOLKREG}/user/${req.params.id}`),
    fetch(`http://localhost:${process.env.PORT_AAREG}/user/${req.params.id}`)
    ]);

    let SkattData = "";
    let FolkRegData = "";
    let AARegData = "";
    let data = {}

    if(SkattResponse.status === "fulfilled"){
      if (SkattResponse.value.ok) {
        //console.log("skatt status: " + SkattResponse.value.status)
        if(SkattResponse.value.status === 202){
          SkattData = await SkattResponse.value.json();
          data.SkattData = {...SkattData}
        }
      } else {
          const err = await SkattResponse.value.text()
          console.log(err);
          //res.status(SkattResponse.value.status).send({error: err})
          
      }
    } else{
      console.log("NOT OK")
      
    }
    if(FolkRegResponse.status === "fulfilled"){
      if (FolkRegResponse.value.ok) {
        console.log("OK")
        //console.log("folkreg status: " + FolkRegResponse.value.status)
        if(FolkRegResponse.value.status === 202){
          FolkRegData = await FolkRegResponse.value.json();
          data.FolkRegData = {...FolkRegData}
        }
      } else{
          const err = await FolkRegResponse.value.text()
          console.log(err);
          //res.status(FolkRegResponse.value.status).send({error: err})
      }
    } else{
      console.log("NOT OK")
    }
    if(AARegResponse.status === "fulfilled"){
      if (AARegResponse.value.ok) {
        //console.log("OK")
        //console.log("aareg status: " + AARegResponse.value.status)
        if(AARegResponse.value.status === 202){
          AARegData = await AARegResponse.value.json();
          data.AARegData = {...AARegData}
        }
      } else{
          const err = await AARegResponse.value.text()
          console.log(err);
          //res.status(AARegResponse.value.status).send({error: err})
      }
    } else{
      console.log("NOT OK")
    } 

    if(!data.SkattData & !data.FolkRegData & !data.AARegData){
      throw Error("Cant find user with specified id")
    }
    

    let finalUserData = new finalUser({
      firstName:{
        skatt: data?.SkattData?.firstName,
        folkReg: data?.FolkRegData?.firstName,
        aaReg: data?.AARegData?.firstName,
      }, 
      middleName:{
        skatt: data?.SkattData?.middleName,
        folkReg: data?.FolkRegData?.middleName,
        aaReg: data?.AARegData?.middleName,
      },
      lastName:{
        skatt: data?.SkattData?.lastName,
        folkReg: data?.FolkRegData?.lastName,
        aaReg: data?.AARegData?.lastName
      },
      dateOfBirth:{
        skatt: data?.SkattData?.dateOfBirth,
        folkReg: data?.FolkRegData?.dateOfBirth,
        aaReg: data?.AARegData?.dateOfBirth
      }, 
      country:{
        skatt: data?.SkattData?.country,
        folkReg: data?.FolkRegData?.country,
        aaReg: data?.AARegData?.country
      }, 
      city:{
        skatt: data?.SkattData?.city,
        folkReg: data?.FolkRegData?.city,
        aaReg: data?.AARegData?.city
      },
      postalCode:{
        skatt: data?.SkattData?.postalCode,
        folkReg: data?.FolkRegData?.postalCode,
        aaReg: data?.AARegData?.postalCode
      },
      address:{
        skatt: data?.SkattData?.address,
        folkReg: data?.FolkRegData?.address,
        aaReg: data?.AARegData?.address
      }, 
      grossIncome: data?.SkattData?.grossIncome,
      relations: data?.FolkRegData?.relations, 
      insurance: data?.AARegData?.insurance
    })
    
    res.status(202).send(finalUserData);
  } catch (error) {
    console.log(error);
    res.status(400).send({error: error.message})
  }

  /*
  async function responsHandler(response, dataObj) {
    if(response.value.status === 202){
      dataObj = await response.value.json();
      return dataObj
    }
    if (response.value.status >= 400){
      const err = await response.value.text()
      console.log(err);
      res.status(response.value.status).send({error: err})
    }
  }
  */
}
