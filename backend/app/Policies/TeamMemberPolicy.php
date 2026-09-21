<?php

namespace App\Policies;

use App\Models\TeamMember;
use App\Models\User;

class TeamMemberPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, TeamMember $teamMember): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, TeamMember $teamMember): bool
    {
        $player = $user->player;

        if (!$player || !$player->memberOfTeam) {
            return false;
        }

        return $teamMember->team_id === $player->memberOfTeam->team_id
            && (
                $player->id === $teamMember->team->captain
                || $player->memberOfTeam->grade === 'second-captain'
            );
    }

    public function delete(User $user, TeamMember $teamMember): bool
    {
        $player = $user->player;

        if (!$player || !$player->memberOfTeam) {
            return false;
        }

        return $teamMember->team_id === $player->memberOfTeam->team_id
            && (
                $player->id === $teamMember->team->captain
                || $player->memberOfTeam->grade === 'second-captain'
            );
    }

    public function restore(User $user, TeamMember $teamMember): bool
    {
        return false;
    }

    public function forceDelete(User $user, TeamMember $teamMember): bool
    {
        return false;
    }
}

