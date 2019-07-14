
import { PullToRefresh } from 'antd-mobile';
import {connect} from "react-redux";
import { reverseGoods,reverseSearchGoods} from '../../actions';
import {Item} from "../item";
@connect(
    state=>{
        return {
            ...state.data
        }
    }
)
export class GoodList extends Component{
    state = {
        refreshing:false,
        height:"100%"
    }
    render(){
        const {goods} = this.props;
        // console.log("*******************");
        // console.log(goods);
        return (
            <div>
                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                    height: this.state.height,
                    overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction='down'
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        // 表示正在刷新
                    this.setState({ refreshing: true });
                    setTimeout(() => {
                        this.setState({ refreshing: false });
                        
                        // 列表商品翻转
                        this.props.dispatch(reverseGoods());

                        // 搜索翻转
                            this.props.dispatch(reverseSearchGoods());
                    }, 1000);
                    }}
                >
                     {
                        goods.map((item,i)=>{
                            return (
                                <Item key = {i} good = {item}>
                                    
                                </Item>
                            )
                        })
                    }
                </PullToRefresh>
                
               
            </div>
        )
    }
}