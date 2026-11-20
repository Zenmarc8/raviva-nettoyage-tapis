import React, { useEffect, useMemo, useState } from 'react';
import { Building2, Download, Home, Lock } from 'lucide-react';
import { fetchLeads, updateLeadStatus } from '../../lib/store';
import type {
  LeadCategory,
  LeadRecord,
  LeadStatus,
  SiteRecord,
} from '../../types/database';

interface LeadsPanelProps {
  sites: SiteRecord[];
}

export const LeadsPanel: React.FC<LeadsPanelProps> = ({ sites }) => {
  const [lockedTab, setLockedTab] = useState<LeadCategory>('commercial');
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [siteFilter, setSiteFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const list = await fetchLeads();
      setLeads(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const siteDomainMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of sites) map.set(s.id, s.domain);
    return map;
  }, [sites]);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (l.category !== lockedTab) return false;
      if (siteFilter !== 'all' && l.site_id !== siteFilter) return false;
      if (
        cityFilter.trim() &&
        !l.city.toLowerCase().includes(cityFilter.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [leads, lockedTab, siteFilter, cityFilter]);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    await updateLeadStatus(leadId, status);
    await load();
  };

  const handleExportCsv = () => {
    const headers =
      lockedTab === 'commercial'
        ? [
            'id',
            'site_domain',
            'created_at',
            'status',
            'company_name',
            'full_name',
            'email',
            'phone',
            'city',
            'service_details',
          ]
        : [
            'id',
            'site_domain',
            'created_at',
            'status',
            'full_name',
            'email',
            'phone',
            'city',
            'consent_partner_sharing',
            'consent_timestamp',
            'service_details',
          ];

    const escapeCsv = (val: string | boolean | null | undefined) => {
      const str = val === null || val === undefined ? '' : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = filteredLeads.map((l) => {
      const domain = siteDomainMap.get(l.site_id) || l.site_id;
      if (lockedTab === 'commercial') {
        return [
          l.id,
          domain,
          l.created_at,
          l.status,
          l.company_name,
          l.full_name,
          l.email,
          l.phone,
          l.city,
          l.service_details,
        ]
          .map(escapeCsv)
          .join(',');
      }
      return [
        l.id,
        domain,
        l.created_at,
        l.status,
        l.full_name,
        l.email,
        l.phone,
        l.city,
        l.consent_partner_sharing,
        l.consent_timestamp,
        l.service_details,
      ]
        .map(escapeCsv)
        .join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `raviva-leads-${lockedTab}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          CRM des demandes (Séparation stricte et verrouillée)
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Les contrats commerciaux directs Raviva et les demandes résidentielles (avec consentement Loi 25 horodaté) sont isolés dans deux onglets verrouillés.
        </p>
      </div>

      {/* Strictly Separated Locked Tabs */}
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="CRM Lead Categories">
        <button
          type="button"
          role="tab"
          aria-selected={lockedTab === 'commercial'}
          onClick={() => setLockedTab('commercial')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
            lockedTab === 'commercial'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
          <Building2 className="w-4 h-4" aria-hidden="true" />
          <span>Contrats Commerciaux (Raviva)</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={lockedTab === 'residential'}
          onClick={() => setLockedTab('residential')}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
            lockedTab === 'residential'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
          <Home className="w-4 h-4" aria-hidden="true" />
          <span>Demandes Résidentielles (Partenaires)</span>
        </button>
      </div>

      {/* Filters + CSV Export */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label
              htmlFor="leads-site-filter"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Filtrer par site
            </label>
            <select
              id="leads-site-filter"
              value={siteFilter}
              onChange={(e) => setSiteFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            >
              <option value="all">Tous les sites</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.domain}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="leads-city-filter"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Filtrer par ville
            </label>
            <input
              id="leads-city-filter"
              type="text"
              placeholder="ex: Montréal, Laval..."
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          disabled={filteredLeads.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          Exporter CSV ({filteredLeads.length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Chargement des demandes...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-600">
            {lockedTab === 'commercial'
              ? 'Aucune demande commerciale enregistrée pour ces filtres.'
              : 'Aucune demande résidentielle enregistrée pour ces filtres.'}
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Site</th>
                <th className="py-3 px-4">
                  {lockedTab === 'commercial' ? 'Entreprise & Contact' : 'Client'}
                </th>
                <th className="py-3 px-4">Ville</th>
                <th className="py-3 px-4">Détails</th>
                {lockedTab === 'residential' && (
                  <th className="py-3 px-4">Consentement Partenaire</th>
                )}
                <th className="py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/70 align-top">
                  <td className="py-3 px-4 text-xs font-mono-tabular text-slate-600 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString('fr-CA')}
                  </td>
                  <td className="py-3 px-4 text-xs font-mono-tabular text-slate-700">
                    {siteDomainMap.get(lead.site_id) || lead.site_id}
                  </td>
                  <td className="py-3 px-4">
                    {lead.company_name && (
                      <p className="font-semibold text-slate-900">
                        {lead.company_name}
                      </p>
                    )}
                    <p className="text-slate-800">{lead.full_name}</p>
                    <p className="text-xs text-slate-500">{lead.email}</p>
                    <p className="text-xs font-mono-tabular text-slate-500">
                      {lead.phone}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-slate-800">{lead.city}</td>
                  <td className="py-3 px-4 text-xs text-slate-700 max-w-xs">
                    {lead.service_details}
                  </td>
                  {lockedTab === 'residential' && (
                    <td className="py-3 px-4 text-xs">
                      <span className="font-semibold text-emerald-800 block">
                        {lead.consent_partner_sharing ? 'Consentement vérifié' : 'Non'}
                      </span>
                      <span className="font-mono-tabular text-slate-500">
                        {lead.consent_timestamp
                          ? new Date(lead.consent_timestamp).toISOString()
                          : ''}
                      </span>
                    </td>
                  )}
                  <td className="py-3 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        void handleStatusChange(
                          lead.id,
                          e.target.value as LeadStatus
                        )
                      }
                      aria-label="Statut du dossier"
                      className="px-2.5 py-1.5 rounded border border-slate-300 text-xs font-medium bg-white"
                    >
                      <option value="new">Nouveau</option>
                      <option value="contacted">Contacté</option>
                      <option value="quoted">Soumissionné</option>
                      <option value="closed">Fermé</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
