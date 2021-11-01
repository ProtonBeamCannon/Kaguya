import { Anime } from "@/types";
import {
  SupabaseQueryFunction,
  useSupabaseQuery,
  UseSupabaseQueryOptions,
} from "@/utils/supabase";
import React from "react";
import { QueryKey } from "react-query";
import { SkeletonProps } from "../shared/Skeleton";

interface AnimeSectionProps {
  skeleton: React.ComponentType<SkeletonProps>;
  title: string;
  query: {
    key: QueryKey;
    queryFn: SupabaseQueryFunction<Anime>;
    options?: UseSupabaseQueryOptions<Anime>;
  };
  children(data: Anime | Anime[]): React.ReactNode;
}

const AnimeSection: React.FC<AnimeSectionProps> = (props) => {
  const { query, children, skeleton: Skeleton, title } = props;

  const { data, isLoading } = useSupabaseQuery<Anime>(
    query.key,
    query.queryFn,
    query.options
  );

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="px-4 md:px-12 space-y-4">
      <h1 className="uppercase text-2xl font-semibold">{title}</h1>

      {children(data)}
    </div>
  );
};

export default AnimeSection;
