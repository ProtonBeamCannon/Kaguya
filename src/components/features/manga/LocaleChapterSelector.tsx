import React, { useMemo } from "react";

import locales from "@/locales.json";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import ChapterSelector, { ChapterSelectorProps } from "./ChapterSelector";
import { sortMediaUnit } from "@/utils/data";

const LocaleChapterSelector: React.FC<ChapterSelectorProps> = ({
  manga,
  ...props
}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const defaultTabIndex = useMemo(
    () => locales.findIndex(({ locale }) => locale === router.locale),
    [router.locale]
  );
  const chapters = useMemo(
    () =>
      sortMediaUnit(
        manga.sourceConnections.flatMap((connection) => connection.chapters)
      ),
    [manga]
  );

  return (
    <React.Fragment>
      <Tabs
        defaultIndex={defaultTabIndex}
        selectedTabClassName="bg-white !text-black"
      >
        <TabList className="flex items-center justify-end gap-x-1">
          {locales.map(({ locale }) => {
            return (
              <Tab
                key={locale}
                className={classNames(
                  "px-3 py-2 rounded-[6px] cursor-pointer hover:bg-white hover:text-black transition duration-300"
                )}
              >
                {locale.toUpperCase()}
              </Tab>
            );
          })}
        </TabList>

        <div className="mt-4">
          {locales.map(({ locale }) => {
            const localeEpisodes = chapters?.filter((chapter) =>
              chapter?.source?.locales.some(
                (sourceLocale) => sourceLocale === locale
              )
            );

            return (
              <TabPanel key={locale}>
                {!localeEpisodes?.length ? (
                  <p className="text-center text-2xl">{t("no_chapters")}</p>
                ) : (
                  <ChapterSelector manga={manga} {...props} />
                )}
              </TabPanel>
            );
          })}
        </div>
      </Tabs>
    </React.Fragment>
  );
};

export default LocaleChapterSelector;