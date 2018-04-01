import * as React from 'react';
import {inject, observer} from "mobx-react";

interface ICreditList {
    CalcCreditStore?: any;
}

@inject('CalcCreditStore')
@observer
class CreditList extends React.Component<ICreditList, {}> {

    render() {
        const {calcViewList, totalValue} = this.props.CalcCreditStore;

        // console.log('calcViewList: ', calcViewList);
        // console.log('totalValue', totalValue);
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#Месяц</th>
                    <th scope="col">Тело к погашению</th>
                    <th scope="col">Проценты к погашению</th>
                    <th scope="col">Общий платеж</th>
                    <th scope="col">Остаток кредита</th>
                </tr>
                </thead>

                <tbody>
                {
                    calcViewList.map((row, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{++index}</th>
                                <td>{row.bodyCredit ? row.bodyCredit.toFixed(2) : null}</td>
                                <td>{row.percentInMonth ? row.percentInMonth.toFixed(2) : null}</td>
                                <td>{row.totalPay ? row.totalPay.toFixed(2) : null}</td>
                                <td>{row.loanCredit ? row.loanCredit.toFixed(2) : null}</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <th>Итого:</th>
                    <td>{totalValue.bodyCredit.toFixed(2)}</td>
                    <td>{totalValue.percentInMonth.toFixed(2)}</td>
                    <td>{totalValue.totalPay.toFixed(2)}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default CreditList;