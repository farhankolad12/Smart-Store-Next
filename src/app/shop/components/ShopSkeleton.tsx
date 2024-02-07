export default function ShopSkeleton() {
  return (
    <div className="container d-flex gap-5 my-5">
      <div className="filter-shop">
        <div className="d-flex flex-column gap-3">
          <div className="p-3 bg-light">
            <strong className="text-uppercase">collection</strong>
          </div>
          <div className="d-flex flex-column gap-1 bg-light p-3">
            {[...Array(3)].map((s, i) => {
              console.log(s);

              return (
                <h5 key={i} className="placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
              );
            })}
          </div>
        </div>
        <div className="border border-2-light my-3">
          <div className="bg-light p-3">
            <strong className="text-uppercase">filter by</strong>
          </div>
          <div className="my-3 px-3">
            <h5 className="placeholder-glow">
              <span className="placeholder col-3"></span>
            </h5>
            <div className="d-flex flex-column gap-2 mt-2">
              {[...Array(3)].map((s, i) => {
                console.log(s);

                return (
                  <h5 key={i} className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </h5>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
