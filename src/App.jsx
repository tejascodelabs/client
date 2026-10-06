import { useEffect, useState } from "react";

const API_URL = "https://nashikmisalqueue.com/api/test";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error("API request was unsuccessful");
      }

      setUsers(result.data || []);
    } catch (err) {
      setUsers([]);
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Users
          </h1>

          <p className="mt-2 text-slate-500">
            Data fetched from Express API
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl bg-blue-50 p-5 text-blue-700">
            Loading users...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />

              <div>
                <p className="font-semibold text-red-700">
                  API Error
                </p>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            {/* Table Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  User List
                </h2>

                <p className="text-sm text-slate-500">
                  Total users: {users.length}
                </p>
              </div>

              <button
                onClick={fetchUsers}
                disabled={loading}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
              >
                Refresh
              </button>
            </div>

            {/* Table */}
            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                        ID
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                        Name
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                        Email
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                        Created At
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          #{user.id}
                        </td>

                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                          {user.name}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {user.email}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(user.createdAt).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center">
                <p className="font-medium text-slate-700">
                  No users found
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  API returned an empty data array.
                </p>
              </div>
            )}

            {/* Raw API Response */}
            <div className="border-t border-slate-200 p-5">
              <p className="mb-2 text-sm font-semibold text-slate-500">
                API Response
              </p>

              <pre className="overflow-auto rounded-xl bg-slate-900 p-4 text-sm text-green-400">
                {JSON.stringify(
                  {
                    success: true,
                    data: users,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        )}

        {/* API URL */}
        <div className="mt-4 rounded-xl bg-white p-4 shadow">
          <p className="text-xs font-medium uppercase text-slate-400">
            API Endpoint
          </p>

          <p className="mt-1 break-all font-mono text-sm text-slate-700">
            GET {API_URL}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;