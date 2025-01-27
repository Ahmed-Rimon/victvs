import React from 'react';

function FilteredCard({filteredExams, showMapData, deleteCard, openModal}:any) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition duration-500 hover:scale-105"
              onClick={() => showMapData(exam)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold mb-2">{exam.Title}</h2>
                <div className="flex">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCard(exam.id);
                    }}
                    className="group hover:bg-red-500/30 text-white px-2 py-1 w-auto rounded"
                  >
                    <svg
                      height="20px"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:text-white fill-red-500 group-hover:!fill-white"
                      viewBox="0 0 32 32"
                      id="delete"
                    >
                      <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z" />
                    </svg>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal("edit", exam.id);
                    }}
                    className="group hover:bg-blue-500/30 text-white px-2 py-1 w-auto rounded"
                  >
                    <svg
                      height="20px"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon fill-blue-500 text-blue-500"
                      style={{
                        verticalAlign: "middle",
                        fill: "currentColor",
                        overflow: "hidden",
                      }}
                      viewBox="0 0 1024 1024"
                      version="1.1"
                    >
                      <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
                      <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{exam.Description}</p>
              <p className="text-gray-600">{exam.CandidateName}</p>
              <p className="text-gray-600">{exam.Date}</p>
              <p className="font-bold">{exam.LocationName}</p>
            </div>
          ))}
        </div>
    );
}

export default FilteredCard;