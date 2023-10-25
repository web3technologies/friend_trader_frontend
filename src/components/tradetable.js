import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useTradePolling from '../hooks/usetradepolling'
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


const tableBaseClasses = 'min-w-full divide-y divide-gray-200';
const tableHeadClasses = 'bg-gray-200 text-left py-2 px-3';
const tableBodyClasses = 'bg-white divide-y divide-gray-200';
const tableRowClasses = 'border-b hover:bg-gray-100';
const tableCellClasses = 'py-2 px-3 cursor-pointer';


const TradeTable = () => {

  const { data } = useTradePolling();

  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full lg:w-2/3 xl:w-1/2">
      <div className="bg-gray-800 text-white p-4">
        <h3 className="text-lg font-semibold">Recent Trades</h3>
      </div>
      <div className="max-h-600 overflow-y-auto">
        <table className={tableBaseClasses}>
          <thead>
            <tr>
              {isMobile ? (
                <>
                  <th className={tableHeadClasses}>Trader</th>
                  <th className={tableHeadClasses}>Action</th>
                </>
              ) : (
                <>
                  <th className={tableHeadClasses}>Trader</th>
                  <th className={tableHeadClasses}>Subject</th>
                  <th className={tableHeadClasses}>Action</th>
                  <th className={tableHeadClasses}>Price</th>
                  <th className={tableHeadClasses}>Block</th>
                  <th className={tableHeadClasses}>Time</th>
                </>
              )}
            </tr>
          </thead>
          <TransitionGroup component="tbody" className={tableBodyClasses}>
            {data.length > 0 ? (
              data.map(item => (
                <CSSTransition
                  key={item.hash}
                  timeout={500}
                  classNames="fade"
                  onEnter={(node) => {
                    node.style.opacity = "0";
                    node.style.transitionProperty = "opacity, transform";
                    node.style.transitionDuration = "2000ms"; // Updated duration
                    node.style.transitionTimingFunction =
                      "cubic-bezier(0.4, 0, 0.2, 1)";
                  }}
                  onEntering={(node) => {
                    node.style.opacity = "1";
                    node.style.transform = "scale(1) translateY(0)";
                  }}
                >
                  {/* Render the table rows depending on the device */}
                  {isMobile ? (
                    // If mobile, show only two cells: Trader and Action
                    <tr className={tableRowClasses}>
                      {/* Use flexbox to display the trader info and image */}
                      <td
                        className={`${tableCellClasses} flex items-center`}
                        onClick={() =>
                          navigate(`/user/${item.trader.twitter_username}`)
                        }
                      >
                        <img
                          src={item.trader.twitter_profile_pic}
                          alt={item.trader.twitter_username}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        @{item.trader.twitter_username}
                      </td>
                      {/* Use flexbox to display the action and price */}
                      <td
                        className={`${tableCellClasses} flex items-center justify-between`}
                      >
                        {/* Use a badge to indicate the action type */}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.is_buy ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.is_buy ? "Bought" : "Sold"}
                        </span>
                        {/* Use a formatted price with the symbol */}
                        <span className="text-gray-500">Ξ{parseFloat(item.price).toFixed(2)}</span>
                      </td>
                    </tr>
                  ) : (
                    // If not mobile, show all six cells
                    <tr className={tableRowClasses}>
                      <td
                        className={tableCellClasses}
                        onClick={() =>
                          navigate(`/user/${item.trader.twitter_username}`)
                        }
                      >
                        <div className="flex items-center">
                          <img
                            src={item.trader.twitter_profile_pic}
                            alt={item.trader.twitter_username}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          @{item.trader.twitter_username}
                        </div>
                      </td>
                      <td
                        className={tableCellClasses}
                        onClick={() =>
                          navigate(`/user/${item.subject.twitter_username}`)
                        }
                      >
                        <div className="flex items-center">
                          <img
                            src={item.subject.twitter_profile_pic}
                            alt={item.subject.twitter_username}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          @{item.subject.twitter_username}
                        </div>
                      </td>
                      <td
                        className={`${tableCellClasses} ${
                          item.is_buy ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {item.is_buy ? "Bought" : "Sold"}
                      </td>
                      <td className={tableCellClasses}>
                        Ξ{parseFloat(item.price).toFixed(2)}
                      </td>
                      <td className={tableCellClasses}>{item.block}</td>
                      <td className={tableCellClasses}>{item.time}</td>
                    </tr>
                  )}
                </CSSTransition>
              ))
            ) : (
              // If no data, show a message
              <tr>
                <td colSpan={isMobile ? 2 : 6} className="py-4 text-center text-gray-400">
                  No data available.
                </td>
              </tr>
            )}
          </TransitionGroup>
        </table>
      </div>
    </div>
  );
};

export default TradeTable