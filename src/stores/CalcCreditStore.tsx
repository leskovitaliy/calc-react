import * as React from 'react';
import {action, observable} from 'mobx';


class CalcCreditStore {
    @observable calcViewList = [];

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
    }
}

const instance = new CalcCreditStore();
export default instance;
