import { Component } from 'preact';
import './Donate.css';

class Donate extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="Donate">
        If you like the game and you want the game to stay (advertisement) free,
        please check out the{' '}
        <a href="https://www.gofundme.com/manage/atc-manager-2" target="_blank">
          GoFundMe Page
        </a>{' '}
        or:
        <br />
        <br />
        <form
          target="_blank"
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          style="margin-bottom: 0;"
        >
          <input
            type="hidden"
            name="business"
            value="thankyousomuchyouareamazing@esstudio.site"
          />

          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="item_name" value="ATC Manager 2" />
          <input
            type="hidden"
            name="item_number"
            value="ATC Manager 2 Campaign"
          />
          <div>
            <select style="width: 90px" name="currency_code">
              <option selected value="USD">
                USD
              </option>
              <option value="EUR">EUR</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="RUB">RUB</option>
            </select>
            <select style="width: 300px;" name="amount">
              <option value="1.00">1.00 - Bugfixing</option>
              <option selected value="2.00">
                2.00 - Buy me a coffee
              </option>
              <option value="3.00">
                3.00 - Buy me a Latte
              </option>
              <option value="4.00">
                4.00 - Buy me a Caramel Macchiato
              </option>
              <option value="5.00">
                5.00 - Become a subreddit moderator 
              </option>
              <option value="7.00">
                7.00 - New timelapse video 
              </option>
              <option value="8.00">
                8.00 - More tutorials
              </option>
              <option value="10.00">
                10.00 - Buy me lunch
              </option>
              <option value="20.00">
                20.00 - Buy me dinner
              </option>
              <option value="50.00">
                50.00 - Help me upgrade to a 1920x1080 monitor
              </option>
              <option value="100.00">
                100.00 - Multiplayer
              </option>
              <option value="200.00">
                200.00 - Emergencies
              </option>
              <option value="500.00">
                500.00 - Help me pay off my student debt
              </option>
              <option value="1000.00">
                1000.00 - Don't
              </option>
            </select>
            <br />
          </div>
          <div>
            <small>
              If you're preferred currency is not listed, please use "Give a
              custom amount".
            </small>
          </div>
          <div>
            <a
              title="Donate"
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=polyismstudio@gmail.com&item_name=ATC+Manager+2&item_number=ATC+Manager+2+Campain"
              target="_blank"
            >
              Give a custom amount
            </a>
          </div>
          <input type="submit" value="Donate" />
        </form>
        <br />
        BTC Address: 36Za9aYukYfNZW2KLv1ST6Xy15cUSP7A6t
        <br />
        BCH Address: qpyy02yht9s2zaupjxucptvq9nehqncd3y2xa4kq0y
        <br />
        ETH Address: 0x6E8473ed45eab930D8Bd82CB9cE6353BCD0d2520
        <br />
        LTC Address: MMZFVTkPQqQiQmLFyb4C6K1Hnz8EzG18bH
      </div>
    );
  }
}

export default Donate;
