import * as React from 'react';
import CreditList from "./CreditList";
import {inject, observer} from "mobx-react";

interface ICalcCredit {
    CalcCreditStore?: any;
}

@inject('CalcCreditStore')
@observer
class CalcCredit extends React.Component<ICalcCredit, {}> {
    private creditStore = this.props.CalcCreditStore;

    state = {
        totalCredit: 1000,
        totalMonth: 12,
        percentInYear: 18,
        firstPay: 0
    };

    onChangeTotalSumCredit(e) {
        this.setState({totalCredit: parseInt(e.target.value)});
    }

    onChangeTotalMonth(e) {
        const num = parseInt(e.target.value);
        if (num > 360 || !Number.isInteger(num)) return;

        this.setState({totalMonth: num})
    }

    onChangePercentInYear(e) {
        this.setState({percentInYear: +e.target.value});
    }

    onChangeFirstPay(e) {
        this.setState({firstPay: parseInt(e.target.value)});
    }

    calculateCredit(totalCredit: number, totalMonth: number, percentInYear: number, firstPay: number) {
        const sumCredit = totalCredit - firstPay;
        const bodyCredit = sumCredit / totalMonth;
        let currentSumCredit = sumCredit;

        for (let i = 0; i < this.state.totalMonth; i++) {
            const currentBodyCredit = i !== 0 ? bodyCredit : 0;
            const sumPercentInMonth = (currentSumCredit - currentBodyCredit) / 100 * percentInYear / 12;

            currentSumCredit -= bodyCredit;

            this.creditStore.addCalcRow(bodyCredit, sumPercentInMonth, bodyCredit + sumPercentInMonth, currentSumCredit);
        }
    }

    handlerCalculate(e) {
        e.preventDefault();
        this.creditStore.clearCalc();
        this.calculateCredit(this.state.totalCredit, this.state.totalMonth, this.state.percentInYear, this.state.firstPay);
    }

    render() {
        return (
            <div>
                <form id='calc'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className='form-group'>
                                <label htmlFor='totalSumCredit'>Сумма кредита:</label>
                                <input id='totalSumCredit'
                                       className='form-control'
                                       type='number'
                                       step='1000'
                                       name='totalSumCredit'
                                       value={this.state.totalCredit}
                                       onChange={this.onChangeTotalSumCredit.bind(this)}/>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='form-group'>
                                <label htmlFor='totalMonth'>Срок кредита:</label>
                                <input id='totalMonth'
                                       className='form-control'
                                       type='number'
                                       step='1'
                                       name='totalMonth'
                                       maxLength={3}
                                       value={this.state.totalMonth}
                                       onChange={this.onChangeTotalMonth.bind(this)}
                                       placeholder="кол-во месяцев(от 1 до 360)"/>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='form-group'>
                                <label htmlFor='percentInYear'>Процентная ставка:</label>
                                <input id='percentInYear'
                                       type='number'
                                       step='0.1'
                                       name='percentInYear'
                                       className='form-control'
                                       value={this.state.percentInYear}
                                       onChange={this.onChangePercentInYear.bind(this)}/>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='form-group'>
                                <label htmlFor='firstPay'>Первоначальный взнос:</label>
                                <input id='firstPay'
                                       type='number'
                                       step='1000'
                                       name='firstPay'
                                       className='form-control'
                                       value={this.state.firstPay}
                                       onChange={this.onChangeFirstPay.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='offset-md-9 col-md-3'>
                            <div className='form-group'>
                                <button className='btn btn-success'
                                        type='submit'
                                        onClick={this.handlerCalculate.bind(this)}>
                                    Расчитать
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <CreditList />
            </div>
        )
    }
}

export default CalcCredit;