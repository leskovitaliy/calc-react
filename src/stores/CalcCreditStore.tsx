import * as React from 'react';
import {action, observable} from 'mobx';


class CalcCreditStore {
    @observable calcViewList = [];
    @observable totalValue = {
        bodyCredit: 0,
        percentInMonth: 0,
        totalPay: 0
    };

    @action addCalcRow(bodyCredit, sumPercentInMonth, totalPay, loanCredit) {
        this.calcViewList.push({
            bodyCredit: bodyCredit,
            percentInMonth: sumPercentInMonth,
            totalPay: totalPay,
            loanCredit: loanCredit
        })
    }

    @action clearCalc() {
        this.calcViewList.length = 0;
        this.totalValue.bodyCredit = 0;
        this.totalValue.percentInMonth = 0;
        this.totalValue.totalPay = 0;
    }

    @action getCalcTotalValue() {
        this.calcViewList.forEach((row) => {
            this.totalValue.bodyCredit += row.bodyCredit;
            this.totalValue.percentInMonth += row.percentInMonth;
            this.totalValue.totalPay += row.totalPay;
        })
    }

}

const instance = new CalcCreditStore();
export default instance;
