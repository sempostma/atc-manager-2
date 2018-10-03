import { Component } from 'preact';
import './Donate.css';

class Donate extends Component {
  constructor(props) {
    super();
    this.state = {
    };

  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="Donate">
        If you like the game and you want the game to stay (advertisement) free, please check out the <a href="https://www.gofundme.com/manage/atc-manager-2" target="_blank">GoFundMe Page</a> or:
        <br />
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" style="margin-bottom: 0;">
          <input type="hidden" name="business"
            value="thankyousomuchyouareamazing@esstudio.site" />

          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="item_name" value="ATC Manager 2" />
          <input type="hidden" name="item_number" value="ATC Manager 2 Campaign" />
          <div>
            <select style="width: 80px" name="currency_code">
              <option selected value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="RUB">RUB</option>
            </select>
            <select style="width: 300px;" name="amount">
              <option value="1.00">1.00 - Bugfixing</option>
              <option selected value="2.00">2.00 - Buy us a coffee</option>
            </select>
            <br />
          </div><div>
            <small>If you're preferred currency is not listed, please use "Give a custom amount"</small>
          </div><div>
            <a title="Donate" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=polyismstudio@gmail.com&item_name=ATC+Manager+2&item_number=ATC+Manager+2+Campain" target="_blank">Give a custom amount</a>
          </div>
          <input type="submit" value="Donate" />
        </form>
        <br />
        BTC Address: 36Za9aYukYfNZW2KLv1ST6Xy15cUSP7A6t<br />
        BCH Address: qpyy02yht9s2zaupjxucptvq9nehqncd3y2xa4kq0y<br />
        ETH Address: 0x6E8473ed45eab930D8Bd82CB9cE6353BCD0d2520<br />
        LTC Address: MMZFVTkPQqQiQmLFyb4C6K1Hnz8EzG18bH
      </div>
    );
  }
}

export default Donate;
