import React from "react";
import Relay from "../Relay";
import { Stage, Layer } from "react-konva";
import Validator from "../Validator";
import BlockAnimationNew from "./BlockAnimation-new";
import Bottombar from "../Bottombar";
import { withRouter } from 'react-router-dom';

class KusamaApp extends React.Component {
  // constructor() {
  //   super();
  //   this.latestBlockAuthor = undefined;
  //   this.state = {
  //     validators: [],
  //     lastAuthor: "",
  //     start: null,
  //     isloading:true,
  //     valtotalinfo:[]
  //   };
  //   this.ismounted = true
  // }


  componentDidMount() {
    if(!this.props.valtotalinfo){
    this.props.createApi();
    }
  }

  // async createApi() {
  //   const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
  //   const api = await ApiPromise.create(provider);
  //   await api.derive.chain.subscribeNewHead(block => {
  //     // console.log(`block #${block.author}`);
  //     const lastAuthor = block.author.toString();
  //     if(this.ismounted){
  //     this.setState({ lastAuthor });
  //     }
  //     const start = new Date();
  //     if(this.ismounted){
  //     this.setState({ start: start });
  //     }
  //   });

  //   await api.query.session.validators(validators => {
  //     const sessionValidators = validators.map(x => x.toString());
  //     if(this.ismounted){
  //     this.setState({ 
  //       validators: sessionValidators       
  //      });
  //     }
  //   });





  //   async function asyncForEach(array, callback) {
  //     for (let index = 0; index < array.length; index++) {
  //       await callback(array[index], index, array);
  //     }
  //   }
  //   const start = async () => {
  //     let arr1 =[]
  //     let count =0
  //     await asyncForEach(this.props.validators, async (val) => {
  //       console.log(val,count++)
  //       let stakers = await api.derive.staking.info(val)
  //       let stakeinfo = JSON.parse(stakers)
  //       console.log(stakeinfo.stakers.others)
  //       arr1.push({
  //         valname:val,
  //         valinfo:stakeinfo
  //         })
  //       // stakeinfo.stakers.others.forEach(ele => {
  //       //   if(ele.who === this.props.match.params.nominatorAddress)
  //       //   {
  //       //     arr1.push(val)
  //       //     bonded += ele.value /Math.pow(10,15)
  //       //   }
  //       // })
  //     });
  //     console.log('Done');
  //     console.log(arr1)
  //     this.setState({
  //       valtotalinfo:arr1,
  //       isloading: false
  //     })
  //   }
  //   start();
    





  
  // componentWillUnmount(){
  //   this.ismounted = false;
  // }

  render() {
    // console.log(this.props)
    const arr = this.props.valtotalinfo;
    const intentionsarr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
    // const validatortext = "Validators: " + this.props.validators.length + "/" + this.props.totalvalidators
    // const arr1 = [1,2,3,4,5,6,7,8]
    return (
      // this.props.isloading ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div><div className="lds-text">Waiting for API to be connected.....</div></React.Fragment>) : 
      // (

      <div className="kusamacontainer">

        <div className="heading">
          <h2>Kusama Network</h2>
        </div>

        <div className="intentions">
          <div>Next Up:</div>
          {intentionsarr.map((ele,index) => {
            return (
            <div className="inten" key={index}>
              <span className="valsign"></span>
              {ele.toString().slice(0,8) + "......" + ele.toString().slice(-8)}
            </div>
            )
          })}
        </div>
        
        <div className="relay-circle">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
            {/* <Parachains x={window.innerWidth} y={window.innerHeight} parachains={arr1}/> */}
              {/*in  (90 - 1) "-1"  is to handle the deviation of hexagon wrt to validators */}
              {arr.map((person, index) => (
                <Validator
                  key={index}
                  validatorAddress={this.props.valtotalinfo[index].valname}
                  valinfo={this.props.valtotalinfo[index].valinfo}
                  totalinfo={this.props.valtotalinfo}
                  nominatorinfo={this.props.nominatorinfo}
                  angle={180 - (index * 360) / arr.length}
                  history={this.props.history}
                  intentions={intentionsarr}
                  x={
                    window.innerWidth +
                    360 *
                      Math.cos((90 - 1 - (index * 360) / arr.length) * 0.0174533)
                  }
                  y={
                    window.innerHeight +
                    360 *
                      Math.sin((90 - 1 - (index * 360) / arr.length) * 0.0174533)
                  }
                  isKusama={true}
                />
              ))}
              {/* {console.log(this.props.bottombarobject.finalblock)}
              {console.log(this.props.previousBlock)} */}
              {this.props.previousBlock !== undefined && <BlockAnimationNew
                key={this.props.validators.indexOf(this.props.lastAuthor)}
                angle={
                  180 -
                  (this.props.validators.indexOf(this.props.lastAuthor) * 360) /
                    arr.length
                }
                x1={
                  window.innerWidth / 2 +
                  100 *
                    Math.cos(
                      (90 -
                        (this.props.validators.indexOf(this.props.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                y1={
                  window.innerHeight / 2 +
                  100 *
                    Math.sin(
                      (90 -
                        (this.props.validators.indexOf(this.props.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                x2={
                  window.innerWidth / 2 +
                  160 *
                    Math.cos(
                      (90 -
                        (this.props.validators.indexOf(this.props.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
                y2={
                  window.innerHeight / 2 +
                  160 *
                    Math.sin(
                      (90 -
                        (this.props.validators.indexOf(this.props.lastAuthor) *
                          360) /
                          arr.length) *
                        0.0174533
                    )
                }
              />}
              <Relay x={window.innerWidth} y={window.innerHeight} isKusama={true}/>
              
            </Layer>
          </Stage>
        </div>
        <div className="bottombar">
          <Bottombar start={this.props.start} activevalidators={this.props.validators.length} validatorcount={this.props.validatorcount} bottombarobject ={this.props.bottombarobject} isKusama={true}/>
        </div>
      </div>

      // )
    );
  }
}

export default withRouter(KusamaApp);