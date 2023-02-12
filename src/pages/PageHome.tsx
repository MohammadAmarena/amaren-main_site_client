import { Key, useContext } from "react";
import { Helmet } from 'react-helmet';
import { AppContext } from "../AppContext";

export const PageHome = () => {
  const {
    routes,
    adminIsLoggedIn,
    handleDeleteRoute,
    handleRouteFieldChange,
    handleEditRoute,
    handleCancelEditRoute,
    handleSaveEditRoute,
    isAdding,
		handleToggleAddRoute,
		newRoute,
		handleAddRouteFieldChange,
		handleSaveNewRoute,
  } = useContext(AppContext)

  return (
    <div className="page pageHome">
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      {adminIsLoggedIn && (
				<>
					{!isAdding ? (
						<div className="addRouteArea">
							<button onClick={() => handleToggleAddRoute()}>
								Add Route
							</button>
						</div>
					) : (
						<fieldset className="addRouteForm">
							<legend>Adding Route</legend>
							<form>
								<div className="row">
									<label>Name</label>
									<div className="control">
										<input
											value={newRoute.name}
											onChange={(e) =>
												handleAddRouteFieldChange(
													'name',
													newRoute,
													e.target.value
												)
											}
											type="text"
										/>
									</div>
								</div>
								<div className="row">
									<label>Source</label>
									<div className="control">
										<textarea
											value={newRoute.source}
											onChange={(e) =>
												handleAddRouteFieldChange(
													'source',
													newRoute,
													e.target.value
												)
											}
										/>
									</div>
								</div>
								<div className="buttonRow">
									<button
										onClick={() => handleToggleAddRoute()}
									>
										Clear
									</button>
									<button
										type="button"
										onClick={handleSaveNewRoute}
									>
										Save
									</button>
								</div>
							</form>
						</fieldset>
					)}
				</>
			)}
      {routes.map((route: any, i: Key) => {
        return (
          <div className="routes" key={i}>
            <h2 className="portfolio">Take a look at my <a href={route.source}>://{route.name}</a></h2>
            <div className="info">
              {!route.isBeingEdited ? (
                <div className="showDataArea">
                  {adminIsLoggedIn && (
                    <div className="buttonArea">
                      <button type="button" onClick={() => handleDeleteRoute(route)} >
                        Delete
                      </button>
                      <button type="button" onClick={() => handleEditRoute(route)} >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="editArea">
                  <form>
                    <div className="row">
                      <label>Name</label>
                      <div className="control">
                        <input value={route
                          .originalEditFields
                          .name}
                          onChange={(e) => handleRouteFieldChange(
                            'name',
                            route,
                            e.target.value)} type="text" />
                      </div>
                    </div>
                    <div className="row">
                      <label>Source</label>
                      <div className="control">
                        <textarea value={route
                          .originalEditFields
                          .source}
                          onChange={(e) => handleRouteFieldChange(
                            'source',
                            route,
                            e.target.value)} />
                      </div>
                    </div>
                    <div className="editFormButtons">
                      <button type="button" onClick={() => handleCancelEditRoute(route)} >
                        Cancel
                      </button>
                      <button type="button" onClick={() => handleSaveEditRoute(route)} >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )
      })
      }
    </div>
  );
};