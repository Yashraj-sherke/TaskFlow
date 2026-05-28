import { PermissionType } from "@/constant";
import { UserType, WorkspaceWithMembersType } from "@/types/api.type";
import { useMemo } from "react";

const usePermissions = (
  user: UserType | undefined,
  workspace: WorkspaceWithMembersType | undefined
) => {
  return useMemo<PermissionType[]>(() => {
    if (!user || !workspace) {
      return [];
    }

    const member = workspace.members.find(
      (member) => String(member.userId) === String(user._id)
    );

    return member?.role.permissions || [];
  }, [user, workspace]);
};

export default usePermissions;
